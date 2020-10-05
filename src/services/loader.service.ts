import { ref } from 'vue';

export class LoaderService {
  private static _Instance: LoaderService;
  public static get Instance() {
    if (!LoaderService._Instance) {
      LoaderService._Instance = new LoaderService();
    }
    return LoaderService._Instance;
  }
  private constructor() {}

  // Properties
  private FullScreenLoaderCount = 0;

  // Full Screen Loader for API requests
  private _FullScreenLoader = ref(false);
  public FullScreenLoaderMessage = '';

  // Getter
  get FullScreenLoader() {
    return this._FullScreenLoader;
  }

  // Show loader
  public showFullScreenLoader(message?: string, state = true) {
    if (state) {
      this._FullScreenLoader.value = true;
      this.FullScreenLoaderMessage = message ?? '';
      this.FullScreenLoaderCount++;
    }
  }

  // Hide loader
  public hideFullScreenLoader(state = true) {
    if (state) {
      this.FullScreenLoaderCount--;
      if (this.FullScreenLoaderCount === 0) {
        this._FullScreenLoader.value = false;
      }
    }
  }
}
