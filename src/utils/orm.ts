export function buildSelectFields(alias: string, attrs?: string[]): string[] {
  return attrs?.length ? attrs.map((a) => `${alias}.${a}`) : [alias];
}
