'use client'
import Link from "next/link"
import { MdClose, MdMenu } from "react-icons/md"

const Drawer = () => {
  return (
    <div className="drawer sm:hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label htmlFor="my-drawer" className="btn btn-ghost btn-square">
          <MdMenu size={24} />
        </label>
      </div>
      <div className="drawer-side z-50">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <label htmlFor="my-drawer" className="btn btn-ghost btn-square ml-auto">
              <MdClose size={24} />
            </label>
          </li>
          <li>
            <Link
              href={'/'}
              onClick={() => {
                if (!window) return
                (document.querySelector('#my-drawer') as any).click()
              }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href={'/characters'}
              onClick={() => {
                if (!window) return
                (document.querySelector('#my-drawer') as any).click()
              }}
            >
              Characters
            </Link>
          </li>

        </ul>
      </div>
    </div>
  )
}

export default Drawer