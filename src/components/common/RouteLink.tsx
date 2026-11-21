import type { ComponentPropsWithoutRef } from 'react';
import type { RoutePath } from '../../types';

type RouteLinkProps = Omit<ComponentPropsWithoutRef<'a'>, 'href'> & {
  href: RoutePath;
  onNavigate: (path: RoutePath) => void;
};

export function RouteLink({ href, onNavigate, onClick, ...props }: RouteLinkProps) {
  return (
    <a
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        onNavigate(href);
      }}
    />
  );
}
