import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import TextField from '@/components/TextField/TextField';

export default function WritingPage() {
  return (
    <>
      <header className={'shadow-md h-20 m-[-2rem] mb-0 bg-white'}></header>
      <section className={'pt-8 grid h-full'}>
        <header className={'flex justify-between pb-6'}>
          <div className={'prose'}>
            <h1 className={'mb-0'}>Speaking - Análises recebidas</h1>
          </div>

          <button className={'btn btn-primary'}>
            <Link href={'/writing/new'}>Solicitar análise</Link>
          </button>
        </header>
        <div className="overflow-x-auto">
          <table className="table rounded-lg">
            {/* head */}
            <thead>
              <tr className="bg-slate-300">
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr className="hover:bg-slate-200 cursor-pointer">
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr className="hover:bg-slate-200 cursor-pointer">
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr className="hover:bg-slate-200 cursor-pointer">
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="join mx-auto mt-8">
          <button className="join-item btn bg-slate-300">«</button>
          <button className="join-item btn bg-slate-300">Page 22</button>
          <button className="join-item btn bg-slate-300">»</button>
        </div>
      </section>
    </>
  );
}
