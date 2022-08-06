import { AdjustmentsIcon, MenuAlt2Icon, PlusIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { CustomLink } from './CustomLink'

export const Nav: FC = () => {
  return (
    <nav>
      <ul className='flex justify-between items-center text-sm p-2 -ml-2'>
        <div className='flex'>
          <li className='mx-2'>
            <CustomLink to='/sessions'>sessions</CustomLink>
          </li>
          <li className='mx-2'>
            <CustomLink to='/activities'>activities</CustomLink>
          </li>
        </div>
        <div className='flex'>
          <li className='mx-2'>
            <CustomLink to='/sessions/graph'>
              <MenuAlt2Icon className='h-4 w-4 text-gray-600' />
            </CustomLink>
          </li>
          <li className='mx-2' data-cy='session-add'>
            <CustomLink to='/new-session'>
              <PlusIcon className='h-4 w-4 text-gray-600' />
            </CustomLink>
          </li>
          <li className='mx-2'>
            <CustomLink to='/sessions/graph'>
              <AdjustmentsIcon className='h-4 w-4 text-gray-600' />
            </CustomLink>
          </li>
        </div>
      </ul>
    </nav>
  )
}
