// Export all UI components for easy importing
// Keep legacy button as default export for backwards compatibility
export { Button, buttonVariants, type ButtonProps } from "./legacy-button"
// Export new button separately for new navbar
export { Button as NewButton, buttonVariants as newButtonVariants } from "./button"
export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  cardVariants,
  type CardProps 
} from "./card"
export { Badge, type BadgeProps } from "./badge"
export { Separator } from "./separator"
export { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "./accordion"
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "./navigation-menu"