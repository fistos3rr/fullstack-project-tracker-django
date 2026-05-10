import React from 'react';

interface MainProps {
  children?: React.ReactNode;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}


const MainContent: React.FC<MainProps> = ({ children, spacing = 'md' }) => {
    const spacingClasses = {
      sm: 'space-y-4',
      md: 'space-y-6',
      lg: 'space-y-8',
      xl: 'space-y-12',
    };

    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-8">
        <div className={spacingClasses[spacing]}>
          {children} 
        </div>
      </main>
    );
}


export default MainContent;
