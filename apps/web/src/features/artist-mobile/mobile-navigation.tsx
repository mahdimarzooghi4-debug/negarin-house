import { Children, cloneElement, isValidElement, type HTMLAttributes, type ReactNode } from "react";

const navigationIcons: Record<string, string> = {
  account: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.6-3.5 3.2-5.5 7-5.5s6.4 2 7 5.5"/>',
  opportunities: '<path d="M4 18 9 13l3 2 7-8"/><path d="M14 7h5v5"/><path d="M4 21h16"/>',
  products: '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4.5 7.7 7.5 4.2 7.5-4.2M12 12v9"/>',
  orders: '<path d="M6 4h12a2 2 0 0 1 2 2v14H4V6a2 2 0 0 1 2-2Z"/><path d="M9 4V2h6v2M8 9h8M8 13h8M8 17h5"/>',
  dashboard: '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1V10Z"/>',
};

const iconSource = (destination: string) =>
  `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#405654" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${navigationIcons[destination]}</svg>`)}`;

function normalizeIconSet(nodes: ReactNode, destination?: string): ReactNode {
  return Children.map(nodes, node => {
    if (!isValidElement<{children?: ReactNode; destination?: string; src?: string; alt?: string}>(node)) return node;
    const currentDestination = node.props.destination || destination;
    if (node.type === "img" && currentDestination && navigationIcons[currentDestination]) {
      return cloneElement(node, {src: iconSource(currentDestination), alt: ""});
    }
    if (node.props.children === undefined) return node;
    return cloneElement(node, {
      children: normalizeIconSet(node.props.children, currentDestination),
    });
  });
}

export function MobileNavigation({children,...props}:HTMLAttributes<HTMLElement>&{children:ReactNode}){
  return <nav {...props} aria-label="منوی هنرمند">{normalizeIconSet(children)}</nav>;
}
