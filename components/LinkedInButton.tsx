interface LinkedInButtonProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function LinkedInButton({ className = '', size = 'md' }: LinkedInButtonProps) {
  const sizeClasses = {
    sm: 'w-40 h-8 text-sm px-4',
    md: 'w-48 h-10 text-sm px-6',
    lg: 'w-56 h-12 text-base px-8'
  };

  return (
    <a
      href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=elio-queiroz-a22391141"
      target="_blank"
      rel="noopener noreferrer"
      className={`
        inline-flex items-center justify-center
        ${sizeClasses[size]}
        bg-[#0A66C2] hover:bg-[#004182] 
        text-white font-medium
        rounded-lg transition-colors duration-200
        no-underline shadow-sm hover:shadow-md
        ${className}
      `}
    >
      <svg 
        className="w-4 h-4 mr-2" 
        fill="currentColor" 
        viewBox="0 0 24 24"
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
      Seguir no LinkedIn
    </a>
  );
}