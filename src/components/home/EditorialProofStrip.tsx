import type { RoutePath } from '../../types';
import { RelatedWork } from '../common/RelatedWork';

export function EditorialProofStrip({ onNavigate }: { onNavigate: (path: RoutePath) => void }) {
  return <RelatedWork title="Track record" slugs={['enterprise-workflow-intelligence', 'computer-vision-motion', 'demand-forecasting']} onNavigate={onNavigate} />;
}
