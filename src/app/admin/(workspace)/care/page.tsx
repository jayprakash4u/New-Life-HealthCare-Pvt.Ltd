import { redirect } from 'next/navigation';

export default function AddCareRedirect() {
  redirect('/admin/care/service');
}
