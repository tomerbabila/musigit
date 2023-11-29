import { Git } from './git';
import { Zip } from './zip';

class Main {
  private _git!: Git;
  private _zip: Zip;

  constructor() {
    this._zip = new Zip();
  }

  get git(): Git {
    return this._git;
  }

  set git(localPath: string) {
    this._git = new Git(localPath);
  }

  get zip(): Zip {
    return this._zip;
  }
}

export default new Main();
