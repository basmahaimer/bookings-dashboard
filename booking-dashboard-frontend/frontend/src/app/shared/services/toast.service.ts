import { Injectable, ComponentRef, ViewContainerRef, Injector, ComponentFactoryResolver } from '@angular/core';
import { ToastComponent, ToastConfig, ToastType } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastContainer: ViewContainerRef | null = null;
  private activeToasts: ComponentRef<ToastComponent>[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  setContainer(container: ViewContainerRef): void {
    this.toastContainer = container;
  }

  show(config: ToastConfig): void {
    if (!this.toastContainer) {
      console.warn('Toast container not set. Call setContainer() first.');
      return;
    }

    const factory = this.resolver.resolveComponentFactory(ToastComponent);
    const componentRef = factory.create(this.injector);
    
    const instance = componentRef.instance;
    instance.config = config;
    instance.closed.subscribe(() => {
      this.removeToast(componentRef);
    });

    this.toastContainer.insert(componentRef.hostView);
    this.activeToasts.push(componentRef);
  }

  success(message: string, duration?: number): void {
    this.show({
      message,
      type: 'success',
      duration: duration || 3000
    });
  }

  error(message: string, duration?: number): void {
    this.show({
      message,
      type: 'error',
      duration: duration || 5000
    });
  }

  warning(message: string, duration?: number): void {
    this.show({
      message,
      type: 'warning',
      duration: duration || 4000
    });
  }

  info(message: string, duration?: number): void {
    this.show({
      message,
      type: 'info',
      duration: duration || 3000
    });
  }

  private removeToast(toastRef: ComponentRef<ToastComponent>): void {
    const index = this.activeToasts.indexOf(toastRef);
    if (index > -1) {
      this.activeToasts.splice(index, 1);
      toastRef.destroy();
    }
  }

  clearAll(): void {
    this.activeToasts.forEach(toast => toast.destroy());
    this.activeToasts = [];
  }
}