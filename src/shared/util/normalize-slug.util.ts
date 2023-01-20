export class NormalizeSlugUtil {
  public static normalize(slug: string): string {
    return slug.replace(/\s/g, '_').toLowerCase();
  }
}
