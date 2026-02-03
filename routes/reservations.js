const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../authMiddleware');

// Toutes les routes protégées
router.use(authenticateToken);

// GET toutes les réservations (avec filtres)
router.get('/', (req, res) => {
  const { start, end, userId } = req.query;
  let sql = 'SELECT * FROM reservations WHERE 1=1';
  const params = [];

  if (start && end) {
    sql += ' AND ((start_date BETWEEN ? AND ?) OR (end_date BETWEEN ? AND ?))';
    params.push(start, end, start, end);
  }

  if (userId) {
    sql += ' AND user_id = ?';
    params.push(userId);
  }

  sql += ' ORDER BY start_date ASC';

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// POST nouvelle réservation
router.post('/', (req, res) => {
  const { title, description, start_date, end_date } = req.body;
  const userId = req.user.id;

  // Validation des dates
  if (new Date(start_date) >= new Date(end_date)) {
    return res.status(400).json({ error: 'Date de fin doit être après date de début' });
  }

  // Vérifier chevauchement
  const checkSql = `
    SELECT COUNT(*) as count FROM reservations 
    WHERE user_id = ? 
    AND (
      (start_date BETWEEN ? AND ?) 
      OR (end_date BETWEEN ? AND ?)
      OR (? BETWEEN start_date AND end_date)
    )
  `;

  db.get(checkSql, [userId, start_date, end_date, start_date, end_date, start_date], 
    (err, row) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (row.count > 0) {
        return res.status(400).json({ error: 'Conflit de réservation' });
      }

      // Insérer la réservation
      const insertSql = `
        INSERT INTO reservations (title, description, start_date, end_date, user_id)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.run(insertSql, [title, description, start_date, end_date, userId], 
        function(err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }
          res.status(201).json({ 
            id: this.lastID, 
            message: 'Réservation créée' 
          });
        }
      );
    }
  );
});

// PUT modifier réservation
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, start_date, end_date, status } = req.body;
  
  db.run(
    `UPDATE reservations 
     SET title = ?, description = ?, start_date = ?, end_date = ?, status = ?
     WHERE id = ? AND user_id = ?`,
    [title, description, start_date, end_date, status, id, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Réservation non trouvée' });
      }
      res.json({ message: 'Réservation mise à jour' });
    }
  );
});

// DELETE réservation
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  db.run(
    'DELETE FROM reservations WHERE id = ? AND user_id = ?',
    [id, req.user.id],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (this.changes === 0) {
        return res.status(404).json({ error: 'Réservation non trouvée' });
      }
      res.json({ message: 'Réservation supprimée' });
    }
  );
});

module.exports = router;