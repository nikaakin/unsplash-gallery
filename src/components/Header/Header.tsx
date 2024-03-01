import { Link } from "react-router-dom";

export const Header = ({ text, to }: { text: string; to: string }) => (
  <nav className="pt-10 pb-6 pr-8 text-base md:text-xl text-blue-950 text-end">
    <Link
      to={to}
      className="bg-gray-200 font-semibold py-2 px-5 rounded-lg hover:bg-gray-300 transition-colors"
    >
      {text}
    </Link>
  </nav>
);
