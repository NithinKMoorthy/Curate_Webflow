// app/dashboard/summary/page.tsx or layout.tsx

import { Suspense } from 'react';
import CurateArticlePage from './curateArticle'; // client component

export default function SummaryPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CurateArticlePage />
    </Suspense>
  );
}
