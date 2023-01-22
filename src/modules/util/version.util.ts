export class VersionUtil {
  static get version(): string {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require('../../../package.json').version;
  }
}
