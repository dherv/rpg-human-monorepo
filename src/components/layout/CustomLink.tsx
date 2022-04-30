import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

export const CustomLink = ({ children, to, ...props }: LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  const className = match
    ? "pb-1 text-violet-600 border-b-2 border-violet-600 hover:cursor-pointer"
    : "";

  return (
    <Link className={`${className}`} to={to} {...props}>
      {children}
    </Link>
  );
};
