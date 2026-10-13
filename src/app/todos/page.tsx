import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const metadata = {
  title: 'Supabase Todos — ADYK CARDEX',
  description: 'Supabase integration test page for ADYK CARDEX.',
};

export default async function Page() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: todos, error } = await supabase.from('todos').select();

  return (
    <div className="pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto relative z-10">
      <div className="p-8 sm:p-12 rounded-3xl material-luxury-card bg-white border border-[#EAE8E3] shadow-sm">
        <span className="text-xs uppercase tracking-wider text-[#858585] block mb-2 font-semibold">
          Supabase &bull; Connection Verified
        </span>
        <h1 className="text-3xl font-black text-[#111111] uppercase tracking-tight mb-6">
          Supabase Todos Query
        </h1>

        {error && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs mb-6">
            Note: {error.message} (Create a &apos;todos&apos; table in your Supabase project to populate data).
          </div>
        )}

        <ul className="space-y-2 mb-8 text-sm">
          {todos && todos.length > 0 ? (
            todos.map((todo: { id: string | number; name?: string; title?: string }) => (
              <li key={todo.id} className="p-3 rounded-lg bg-[#FAF9F6] border border-[#EAE8E3] text-[#111111]">
                {todo.name || todo.title || JSON.stringify(todo)}
              </li>
            ))
          ) : (
            <li className="text-xs text-[#858585] italic p-3 rounded-lg bg-[#FAF9F6] border border-[#EAE8E3]">
              No items found in &apos;todos&apos; table yet.
            </li>
          )}
        </ul>

        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[#111111] hover:text-[#B99752] transition-colors font-semibold"
        >
          &larr; Return to ADYK CARDEX Homepage
        </Link>
      </div>
    </div>
  );
}
