const express = require('express');
const router = express.Router();
const db = require('../db');
const authenticateToken = require('../authMiddleware');

router.use(authenticateToken);

// Statistiques d'utilisation
router.get('/', (req, res) => {
  const { period = 'month' } = req.query;
  let sql = '';
  let params = [req.user.id];

  switch(period) {
    case 'day':
      sql = `
        SELECT 
          DATE(start_date) as date,
          COUNT(*) as total,
          SUM(
            (strftime('%s', end_date) - strftime('%s', start_date)) / 3600
          ) as total_hours
        FROM reservations 
        WHERE user_id = ? 
          AND start_date >= date('now', '-30 days')
        GROUP BY DATE(start_date)
        ORDER BY date DESC
      `;
      break;
      
    case 'month':
      sql = `
        SELECT 
          strftime('%Y-%m', start_date) as month,
          COUNT(*) as total_reservations,
          SUM(
            (strftime('%s', end_date) - strftime('%s', start_date)) / 3600
          ) as total_hours
        FROM reservations 
        WHERE user_id = ?
        GROUP BY strftime('%Y-%m', start_date)
        ORDER BY month DESC
        LIMIT 12
      `;
      break;
      
    case 'year':
      sql = `
        SELECT 
          strftime('%Y', start_date) as year,
          COUNT(*) as total_reservations,
          SUM(
            (strftime('%s', end_date) - strftime('%s', start_date)) / 3600
          ) as total_hours
        FROM reservations 
        WHERE user_id = ?
        GROUP BY strftime('%Y', start_date)
        ORDER BY year DESC
      `;
      break;
      
    default:
      return res.status(400).json({ error: 'Période invalide. Utilisez: day, month ou year' });
  }

  db.all(sql, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;