import { useState } from "react";
import { Link } from "react-router-dom";
import { LogOut, Menu, Search, Home, Film, Tv, History, X } from "lucide-react";
import { useAuthStore } from "../store/authUser";
import { useContentStore } from "../store/content";

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { user, logout } = useAuthStore();

	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	const { setContentType } = useContentStore();

	return (
		<>
			{/* Main navbar */}
			<header className='fixed top-0 left-0 right-0 flex items-center justify-between p-4 h-20 bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 z-50'>
				<div className='flex items-center gap-4'>
					<button 
						className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors lg:hidden"
						onClick={toggleMobileMenu}
					>
						<Menu className="size-5" />
					</button>
					<Link to='/'>
						<img src='/PLAYON.png' alt='PlayOn Logo' className='h-10 w-auto sm:h-12' />
					</Link>
				</div>

				<div className='flex gap-4 items-center'>
					<Link to={"/search"} className="bg-gray-800 hover:bg-gray-700 p-2 rounded-full transition-colors">
						<Search className='size-5 cursor-pointer' />
					</Link>
					<div className="flex items-center gap-3 bg-gray-800 px-3 py-1.5 rounded-full">
						<img src={user.image} alt='Avatar' className='h-8 w-8 object-cover rounded-full border-2 border-red-500' />
						<span className="hidden md:block text-sm font-medium truncate max-w-[100px]">{user.username || 'User'}</span>
					</div>
					<button 
						onClick={logout} 
						className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors"
						title="Logout"
					>
						<LogOut className='size-5 cursor-pointer' />
					</button>
				</div>
			</header>

			{/* Sidebar for larger screens */}
			<aside className='fixed left-0 top-20 bottom-0 hidden lg:flex flex-col w-60 bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 p-4 z-40'>
				<div className="space-y-6 mt-4">
					<Link to='/' 
						className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors'
						onClick={() => setContentType("movie")}
					>
						<Film className="size-5 text-red-500" />
						<span className="font-medium">Movies</span>
					</Link>
					<Link to='/' 
						className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors'
						onClick={() => setContentType("tv")}
					>
						<Tv className="size-5 text-red-500" />
						<span className="font-medium">TV Shows</span>
					</Link>
					<Link to='/history' 
						className='flex items-center gap-3 p-2 rounded-lg hover:bg-gray-800 transition-colors'
					>
						<History className="size-5 text-red-500" />
						<span className="font-medium">Watch History</span>
					</Link>
				</div>
				
				<div className="mt-auto mb-6 p-4 rounded-lg bg-gradient-to-r from-red-600/20 to-amber-600/20 border border-red-500/20">
					<h3 className="font-semibold mb-2 text-red-400">PlayOn Premium</h3>
					<p className="text-sm text-gray-300 mb-3">Upgrade for ad-free streaming and exclusive content</p>
					<button className="bg-gradient-to-r from-red-600 to-amber-600 text-white py-2 px-4 rounded-lg w-full font-medium text-sm hover:from-red-700 hover:to-amber-700 transition-colors">
						Upgrade Now
					</button>
				</div>
			</aside>

			{/* Mobile menu overlay */}
			{isMobileMenuOpen && (
				<div className="fixed inset-0 bg-black/90 z-50 lg:hidden">
					<div className="flex flex-col h-full">
						<div className="flex justify-between items-center p-6 border-b border-gray-800">
							<Link to="/" onClick={toggleMobileMenu}>
								<img src='/PLAYON.png' alt='PlayOn Logo' className='h-10 w-auto' />
							</Link>
							<button 
								className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
								onClick={toggleMobileMenu}
							>
								<X className="size-5" />
							</button>
						</div>
						
						<div className="flex-1 overflow-y-auto p-6 space-y-6">
							<Link to={"/"} 
								className='flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors' 
								onClick={() => {
									setContentType("movie");
									toggleMobileMenu();
								}}
							>
								<Film className="size-6 text-red-500" />
								<span className="font-medium text-lg">Movies</span>
							</Link>
							<Link to={"/"} 
								className='flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors' 
								onClick={() => {
									setContentType("tv");
									toggleMobileMenu();
								}}
							>
								<Tv className="size-6 text-red-500" />
								<span className="font-medium text-lg">TV Shows</span>
							</Link>
							<Link to={"/history"} 
								className='flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors' 
								onClick={toggleMobileMenu}
							>
								<History className="size-6 text-red-500" />
								<span className="font-medium text-lg">Watch History</span>
							</Link>
							<Link to={"/search"} 
								className='flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors' 
								onClick={toggleMobileMenu}
							>
								<Search className="size-6 text-red-500" />
								<span className="font-medium text-lg">Search</span>
							</Link>
							
							<div className="border-t border-gray-800 pt-6 mt-6">
								<div className="flex items-center gap-4 mb-6">
									<img src={user.image} alt='Avatar' className='h-12 w-12 object-cover rounded-full border-2 border-red-500' />
									<div>
										<p className="font-medium">{user.username || 'User'}</p>
										<p className="text-sm text-gray-400">{user.email}</p>
									</div>
								</div>
								
								<button 
									onClick={() => {
										logout();
										toggleMobileMenu();
									}}
									className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 p-3 rounded-lg transition-colors"
								>
									<LogOut className="size-5" />
									<span className="font-medium">Sign Out</span>
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};
export default Navbar;
