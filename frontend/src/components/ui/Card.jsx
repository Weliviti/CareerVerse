import clsx from 'clsx';

/**
 * Reusable Card Component
 * A container component with white background, rounded corners, and shadow.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Optional title for quick Header setup
 * @param {'sm' | 'md' | 'lg'} props.shadow - Shadow variant
 * @param {string} props.className - Additional CSS classes
 * @param {Object} rest - Additional HTML div attributes
 *
 * @example
 * // Simple usage with title
 * <Card title="My Stats">
 *   <p>Content</p>
 * </Card>
 *
 * @example
 * // Advanced usage with sub-components
 * <Card shadow="lg">
 *   <Card.Header>Custom Header</Card.Header>
 *   <Card.Body>Main content</Card.Body>
 *   <Card.Footer>Footer content</Card.Footer>
 * </Card>
 */
const Card = ({ children, title, shadow = 'md', className = '', ...rest }) => {
  // Base styles for the card container
  const baseStyles =
    'bg-white rounded-lg border border-gray-200 overflow-hidden';

  // Shadow variants
  const shadowStyles = {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
  };

  return (
    <div
      className={clsx(baseStyles, shadowStyles[shadow], className)}
      {...rest}
    >
      {title && <Card.Header>{title}</Card.Header>}
      {title ? <Card.Body>{children}</Card.Body> : children}
    </div>
  );
};

/**
 * Card Header Sub-component
 * Displays header content with padding and bottom border.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Header content
 * @param {string} props.className - Additional CSS classes
 */
Card.Header = ({ children, className = '', ...rest }) => {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-b border-gray-200 bg-gray-50',
        className
      )}
      {...rest}
    >
      {typeof children === 'string' ? (
        <h3 className="text-lg font-semibold text-gray-900">{children}</h3>
      ) : (
        children
      )}
    </div>
  );
};

/**
 * Card Body Sub-component
 * Displays main content with padding.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Body content
 * @param {string} props.className - Additional CSS classes
 */
Card.Body = ({ children, className = '', ...rest }) => {
  return (
    <div className={clsx('px-6 py-4', className)} {...rest}>
      {children}
    </div>
  );
};

/**
 * Card Footer Sub-component
 * Displays footer content with padding and top border.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - Footer content
 * @param {string} props.className - Additional CSS classes
 */
Card.Footer = ({ children, className = '', ...rest }) => {
  return (
    <div
      className={clsx(
        'px-6 py-4 border-t border-gray-200 bg-gray-50',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Card;
