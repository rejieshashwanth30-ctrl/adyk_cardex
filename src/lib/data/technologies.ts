export interface TechnologyInfo {
  name: string;
  desc: string;
  category?: string;
}

export const TECHNOLOGIES: TechnologyInfo[] = [
  { name: 'NEXT.JS', desc: 'React framework for server-rendered web systems' },
  { name: 'TYPESCRIPT', desc: 'Type-safe distributed application engineering' },
  { name: 'AI / ML', desc: 'Neural architectures and on-device inference models' },
  { name: 'ESP32', desc: 'Bare-metal silicon microcontroller firmware' },
  { name: 'PYTHON', desc: 'Computational analysis, PyTorch & backend services' },
  { name: 'REACT', desc: 'Component ecosystems and reactive canvas engines' },
  { name: 'FLUTTER', desc: 'Cross-platform native client rendering pipelines' },
  { name: 'NODE.JS', desc: 'Event-driven high-throughput runtime services' },
  { name: 'POSTGRESQL', desc: 'Relational data structures, vector extensions' },
  { name: 'IOT', desc: 'Transducers, edge telemetry and sensor clusters' },
  { name: 'ARDUINO', desc: 'Embedded hardware prototyping and real-time control' },
  { name: 'WEBSOCKETS', desc: 'Sub-millisecond bidirectional network streams' },
];

/**
 * Normalized case-insensitive and punctuation-agnostic tech matcher.
 * Matches 'Next.js' with 'NEXT.JS', 'AI / ML' with 'AI', 'Node.js' with 'node.js', etc.
 */
export function matchesTech(itemTech: string, filterTech: string): boolean {
  if (!itemTech || !filterTech) return false;
  const target = filterTech.toLowerCase().replace(/[^a-z0-9]/g, '');
  const clean = itemTech.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (!target || !clean) return false;
  return clean === target || clean.includes(target) || target.includes(clean);
}

/**
 * Retrieve curated architecture details for a technology if available.
 */
export function findTechInfo(techName: string): TechnologyInfo | undefined {
  if (!techName) return undefined;
  const target = techName.toLowerCase().replace(/[^a-z0-9]/g, '');
  return TECHNOLOGIES.find((t) => {
    const clean = t.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    return clean === target || clean.includes(target) || target.includes(clean);
  });
}
