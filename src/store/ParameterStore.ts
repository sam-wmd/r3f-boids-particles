import { makeObservable, observable, action, makeAutoObservable } from 'mobx';

class ParameterStore {
  // Observable properties
  protectedRange: number = 0.6;
  visualRange: number = 1.4;
  maxSpeed: number = 2.5;
  minSpeed: number = 0.1;
  cohesionFactor: number = 0.3;
  avoidFactor: number = 0.05;
  alignFactor: number = 0.1;
  turnFactor: number = 0.03;
  
  screenLeftBoundary: number = -9;
  screenRightBoundary: number = 9;
  screenTopBoundary: number = 3.5;
  screenBottomBoundary: number = -3;

  constructor() {
    makeObservable(this, {
      // Define observables
      protectedRange: observable,
      visualRange: observable,
      screenLeftBoundary: observable,
      screenRightBoundary: observable,
      screenTopBoundary: observable,
      screenBottomBoundary: observable,
      maxSpeed: observable,
      minSpeed: observable,
      cohesionFactor: observable,
      avoidFactor: observable,
      alignFactor: observable,
      turnFactor: observable,

      // Define actions
      setProtectedRange: action,
      setVisualRange: action,
      setScreenLeftBoundary: action,
      setScreenRightBoundary: action,
      setScreenTopBoundary: action,
      setScreenBottomBoundary: action,
      setMaxSpeed: action,
      setMinSpeed: action,
      setCohesionFactor: action,
      setAvoidFactor: action,
      setAlignFactor: action,
      setTurnFactor: action,
      resetToDefaults: action,
    });
  }

  // Individual setter actions
  setProtectedRange = (value: number): void => {
    this.protectedRange = value;
  };

  setVisualRange = (value: number): void => {
    this.visualRange = value;
  };

  setScreenLeftBoundary = (value: number): void => {
    this.screenLeftBoundary = value;
  };

  setScreenRightBoundary = (value: number): void => {
    this.screenRightBoundary = value;
  };

  setScreenTopBoundary = (value: number): void => {
    this.screenTopBoundary = value;
  };

  setScreenBottomBoundary = (value: number): void => {
    this.screenBottomBoundary = value;
  };

  setMaxSpeed = (value: number): void => {
    this.maxSpeed = value;
  };

  setMinSpeed = (value: number): void => {
    this.minSpeed = value;
  };

  setCohesionFactor = (value: number): void => {
    this.cohesionFactor = value;
  };

  setAvoidFactor = (value: number): void => {
    this.avoidFactor = value;
  };

  setAlignFactor = (value: number): void => {
    this.alignFactor = value;
  };

  setTurnFactor = (value: number): void => {
    this.turnFactor = value;
  };

  resetToDefaults = (): void => {
    this.protectedRange = 0.2;
    this.visualRange = 1;
    this.screenLeftBoundary = -10;
    this.screenRightBoundary = 10;
    this.screenTopBoundary = 2.5;
    this.screenBottomBoundary = -2.5;
    this.maxSpeed = 0.5;
    this.minSpeed = 0.1;
    this.cohesionFactor = 0.05;
    this.avoidFactor = 0.05;
    this.alignFactor = 0.05;
    this.turnFactor = 0.2;
  };
}

// Create and export a singleton instance
export default ParameterStore;