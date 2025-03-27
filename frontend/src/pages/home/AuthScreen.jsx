import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Play, Download, Monitor, Users, Star, LayoutGrid, Zap } from "lucide-react";

const AuthScreen = () => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleFormSubmit = (e) => {
		e.preventDefault();
		navigate("/signup?email=" + email);
	};

	return (
		<div className='min-h-screen bg-gradient-to-b from-gray-900 to-black relative'>
			{/* Background effect */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute -right-[300px] -top-[300px] w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[150px]"></div>
				<div className="absolute -left-[300px] -bottom-[300px] w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px]"></div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-red-500/5 to-amber-500/5 rounded-full blur-[200px]"></div>
			</div>

			{/* Navbar with new design */}
			<header className='max-w-7xl mx-auto flex items-center justify-between p-6 relative z-10'>
				<img src='/PLAYON.png' alt='PlayOn Logo' className='h-16 w-auto drop-shadow-lg' />
				<Link to={"/login"} className='text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 py-2 px-6 rounded-full font-medium transition-all shadow-lg hover:shadow-red-500/20 hover:scale-105'>
					Sign In
				</Link>
			</header>

			{/* Hero section with asymmetrical design */}
			<div className='grid grid-cols-1 lg:grid-cols-5 gap-6 max-w-7xl mx-auto pt-4 pb-20 px-6 relative z-10'>
				<div className='lg:col-span-3 flex flex-col justify-center'>
					<div className="space-y-4">
						<div className="inline-block bg-gradient-to-r from-red-600/20 to-amber-600/20 px-4 py-2 rounded-full backdrop-blur-sm border border-red-500/30 shadow-lg">
							<div className="flex items-center gap-2">
								<Star className="size-4 text-amber-500 fill-amber-500" />
								<span className="text-sm font-medium text-white">The ultimate streaming experience</span>
							</div>
						</div>
						
						<h1 className='text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-white drop-shadow-lg'>
							Unlimited movies, shows, and entertainment
						</h1>
						
						<p className='text-lg md:text-xl text-gray-100 max-w-xl drop-shadow-lg'>
							Stream anywhere, anytime. Cancel when you want. Sign up today and get your first month free.
						</p>

						<form className='flex flex-col sm:flex-row gap-4 max-w-xl mt-8' onSubmit={handleFormSubmit}>
							<div className="relative flex-1">
								<input
									type='email'
									placeholder='Enter your email address'
									className='w-full p-4 rounded-full bg-gray-800/70 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500 pl-5 pr-12 backdrop-blur-sm shadow-lg'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
								/>
							</div>
							<button className='bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white text-lg px-8 py-4 rounded-full flex justify-center items-center transition-all shadow-lg hover:shadow-red-500/20 hover:scale-105'>
								Get Started
								<ChevronRight className='size-6 ml-2' />
							</button>
						</form>
					</div>
				</div>
				
				<div className='lg:col-span-2 flex items-center justify-center'>
					<div className="relative">
						<div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-amber-500/20 rounded-3xl blur-xl"></div>
						<img 
							src="/hero.png" 
							alt="Streaming devices" 
							className="relative z-10 rounded-3xl border-2 border-gray-800 shadow-2xl hover:scale-105 transition-transform duration-300"
						/>
						<div className="absolute -bottom-6 -right-6 bg-gray-900/90 backdrop-blur-sm p-3 rounded-2xl border border-gray-800 flex items-center gap-3 shadow-xl">
							<div className="bg-gradient-to-br from-red-600 to-amber-600 p-2 rounded-xl">
								<Zap className="size-6 text-white" />
							</div>
							<div>
								<p className="text-sm font-bold text-white">Ultra HD</p>
								<p className="text-xs text-gray-100">Premium Quality</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Features section with modern cards */}
			<div className="bg-gradient-to-b from-gray-900 to-black py-24 relative z-10">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">Why Choose <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">PlayOn?</span></h2>
						<p className="text-gray-100 text-lg max-w-2xl mx-auto drop-shadow-lg">Experience entertainment like never before with our cutting-edge streaming platform</p>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
						{/* Feature Card 1 */}
						<div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-red-500/10 transition-all hover:-translate-y-1 backdrop-blur-sm">
							<div className="bg-gradient-to-br from-red-600 to-amber-600 p-3 rounded-xl inline-block mb-4">
								<Play className="size-6 text-white" />
							</div>
							<h3 className="text-xl font-bold mb-2 text-white">Unlimited Content</h3>
							<p className="text-gray-100">Stream thousands of movies and TV shows anytime, anywhere.</p>
						</div>
						
						{/* Feature Card 2 */}
						<div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-red-500/10 transition-all hover:-translate-y-1 backdrop-blur-sm">
							<div className="bg-gradient-to-br from-red-600 to-amber-600 p-3 rounded-xl inline-block mb-4">
								<Download className="size-6 text-white" />
							</div>
							<h3 className="text-xl font-bold mb-2 text-white">Download & Watch</h3>
							<p className="text-gray-100">Save your favorites and watch offline on your device.</p>
						</div>
						
						{/* Feature Card 3 */}
						<div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-red-500/10 transition-all hover:-translate-y-1 backdrop-blur-sm">
							<div className="bg-gradient-to-br from-red-600 to-amber-600 p-3 rounded-xl inline-block mb-4">
								<Monitor className="size-6 text-white" />
							</div>
							<h3 className="text-xl font-bold mb-2 text-white">Multi-Device</h3>
							<p className="text-gray-100">Watch on your TV, smartphone, tablet, or laptop seamlessly.</p>
						</div>
						
						{/* Feature Card 4 */}
						<div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-red-500/10 transition-all hover:-translate-y-1 backdrop-blur-sm">
							<div className="bg-gradient-to-br from-red-600 to-amber-600 p-3 rounded-xl inline-block mb-4">
								<Users className="size-6 text-white" />
							</div>
							<h3 className="text-xl font-bold mb-2 text-white">Family Friendly</h3>
							<p className="text-gray-100">Create multiple profiles with customized parental controls.</p>
						</div>
					</div>
				</div>
			</div>
			
			{/* Pricing section */}
			<div className="py-24 bg-gradient-to-b from-black to-gray-900 relative z-10">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center mb-16">
						<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">Choose Your <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">Plan</span></h2>
						<p className="text-gray-100 text-lg max-w-2xl mx-auto drop-shadow-lg">No contracts, no commitments. Upgrade or downgrade anytime.</p>
					</div>
					
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{/* Basic plan */}
						<div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm hover:shadow-lg hover:shadow-red-500/5 transition-all hover:-translate-y-1">
							<div className="p-6">
								<h3 className="text-xl font-bold mb-1 text-white">Basic</h3>
								<p className="text-gray-100 text-sm mb-4">For individuals</p>
								<div className="flex items-baseline mb-4">
									<span className="text-4xl font-bold text-white">$8.99</span>
									<span className="text-gray-100 ml-2">/month</span>
								</div>
								<ul className="space-y-3 mb-6">
									<li className="flex items-center gap-2 text-gray-50">
										<div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
											<div className="w-2 h-2 rounded-full bg-green-500"></div>
										</div>
										<span>HD streaming</span>
									</li>
									<li className="flex items-center gap-2 text-gray-50">
										<div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
											<div className="w-2 h-2 rounded-full bg-green-500"></div>
										</div>
										<span>Watch on 1 device</span>
									</li>
									<li className="flex items-center gap-2 text-gray-400">
										<div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
											<div className="w-2 h-2 rounded-full bg-red-500"></div>
										</div>
										<span>No downloads</span>
									</li>
								</ul>
							</div>
							<div className="px-6 pb-6">
								<button className="w-full py-3 border border-gray-700 rounded-xl hover:bg-gray-800 transition-all text-white hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10">
									Get Started
								</button>
							</div>
						</div>
						
						{/* Standard plan */}
						<div className="bg-gradient-to-br from-gray-900 to-black border border-red-500/30 rounded-2xl overflow-hidden relative shadow-xl shadow-red-500/10 transform scale-105 hover:scale-110 transition-all">
							<div className="absolute top-0 left-0 right-0 py-1 bg-gradient-to-r from-red-600 to-amber-600 text-center text-sm font-semibold text-white">
								MOST POPULAR
							</div>
							<div className="p-6 pt-9">
								<h3 className="text-xl font-bold mb-1 text-white">Standard</h3>
								<p className="text-gray-100 text-sm mb-4">For couples and small families</p>
								<div className="flex items-baseline mb-4">
									<span className="text-4xl font-bold text-white">$14.99</span>
									<span className="text-gray-100 ml-2">/month</span>
								</div>
								<ul className="space-y-3 mb-6">
									<li className="flex items-center gap-2 text-gray-50">
										<div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
											<div className="w-2 h-2 rounded-full bg-green-500"></div>
										</div>
										<span>Full HD streaming</span>
									</li>
									<li className="flex items-center gap-2 text-gray-50">
										<div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
											<div className="w-2 h-2 rounded-full bg-green-500"></div>
										</div>
										<span>Watch on 2 devices</span>
									</li>
									<li className="flex items-center gap-2 text-gray-50">
										<div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
											<div className="w-2 h-2 rounded-full bg-green-500"></div>
										</div>
										<span>Download on 2 devices</span>
									</li>
								</ul>
							</div>
							<div className="px-6 pb-6">
								<button className="w-full py-3 bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-red-500/20">
									Get Started
								</button>
							</div>
						</div>
						
						{/* Premium plan */}
						<div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl overflow-hidden backdrop-blur-sm hover:shadow-lg hover:shadow-red-500/5 transition-all hover:-translate-y-1">
							<div className="p-6">
								<h3 className="text-xl font-bold mb-1 text-white">Premium</h3>
								<p className="text-gray-100 text-sm mb-4">For large families</p>
								<div className="flex items-baseline mb-4">
									<span className="text-4xl font-bold text-white">$19.99</span>
									<span className="text-gray-100 ml-2">/month</span>
								</div>
								<ul className="space-y-3 mb-6">
									<li className="flex items-center gap-2 text-gray-50">
										<div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
											<div className="w-2 h-2 rounded-full bg-green-500"></div>
										</div>
										<span>4K Ultra HD streaming</span>
									</li>
									<li className="flex items-center gap-2 text-gray-50">
										<div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
											<div className="w-2 h-2 rounded-full bg-green-500"></div>
										</div>
										<span>Watch on 4 devices</span>
									</li>
									<li className="flex items-center gap-2 text-gray-50">
										<div className="w-5 h-5 rounded-full bg-gray-800 flex items-center justify-center">
											<div className="w-2 h-2 rounded-full bg-green-500"></div>
										</div>
										<span>Download on 6 devices</span>
									</li>
								</ul>
							</div>
							<div className="px-6 pb-6">
								<button className="w-full py-3 border border-gray-700 rounded-xl hover:bg-gray-800 transition-all text-white hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10">
									Get Started
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			{/* Footer */}
			<footer className='py-12 bg-black text-gray-100 text-center relative z-10'>
				<div className="max-w-7xl mx-auto px-6">
					<img src='/PLAYON.png' alt='PlayOn Logo' className='h-12 w-auto mx-auto mb-6 drop-shadow-lg' />
					
					<div className="flex flex-wrap justify-center gap-6 mb-8 text-sm text-gray-100">
						<a href="#" className="hover:text-white transition-colors hover:scale-105">About Us</a>
						<a href="#" className="hover:text-white transition-colors hover:scale-105">Terms of Service</a>
						<a href="#" className="hover:text-white transition-colors hover:scale-105">Privacy Policy</a>
						<a href="#" className="hover:text-white transition-colors hover:scale-105">FAQ</a>
						<a href="#" className="hover:text-white transition-colors hover:scale-105">Contact</a>
					</div>
					
					<p className="text-gray-100">© 2025 PlayOn. All rights reserved.</p>
				</div>
			</footer>
		</div>
	);
};
export default AuthScreen;
