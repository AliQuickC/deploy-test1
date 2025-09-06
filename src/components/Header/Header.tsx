'use client';

import s from './Header.module.sass';
import { type JSX } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router';
import { useAppState } from '../../redux/useAppSelector';
import { useActions } from '../../redux/useActions';

export function Header(): JSX.Element {
  const headerStyles = classNames('header ', s.header);
  const headerContainerStyles = classNames('container ', s.headerContainer);

  const { isLogin } = useAppState();
  const { login, logout } = useActions();

  return (
    <header className={headerStyles}>
      <div className={headerContainerStyles}>
        <nav>
          <ul className={s.links}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/rest">Rest</NavLink>
            </li>
            <li>
              <NavLink to="/variables">Variables</NavLink>
            </li>
            <li>
              <NavLink to="/history">History</NavLink>
            </li>
            <li>
              <NavLink to="/login">Sign In / Sign Up</NavLink>
            </li>
          </ul>
        </nav>

        <button onClick={() => (isLogin ? logout() : login())}>
          {isLogin ? 'SignOut' : 'SignIn/SignUp'}
        </button>
      </div>
    </header>
  );
}
