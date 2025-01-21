'use client';

import Link from 'next/link';
import {
    Twitter,
    Github,
    Linkedin,
    Youtube,
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 h-96">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Events Column */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white">Events</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/competitions" className="hover:text-white transition-colors">
                                    Competitions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Learn Column */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white">Learn</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/docs" className="hover:text-white transition-colors">
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link href="/resources" className="hover:text-white transition-colors">
                                    Resources
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Info Column */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white">Info</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="hover:text-white transition-colors">
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-white">Connect</h3>
                        <div className="flex space-x-4 mb-4">
                            <a href="https://twitter.com/your-handle" className="hover:text-white">
                                <Twitter className="h-6 w-6" />
                            </a>
                            <a href="https://github.com/your-org" className="hover:text-white">
                                <Github className="h-6 w-6" />
                            </a>
                            <a href="https://linkedin.com/company/your-company" className="hover:text-white">
                                <Linkedin className="h-6 w-6" />
                            </a>
                            <a href="https://youtube.com/@your-channel" className="hover:text-white">
                                <Youtube className="h-6 w-6" />
                            </a>{/*
                            <a href="https://discord.gg/your-server" className="hover:text-white">
                                <Discord className="h-6 w-6" />
                            </a>*/}
                        </div>
                        <p className="text-sm">contact@hivetensor.com</p>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex space-x-6 text-sm">
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Terms of Use
                            </Link>
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/rules" className="hover:text-white transition-colors">
                                Rules and Guidelines
                            </Link>
                        </div>
                        <p className="text-sm">© HiveTensor {new Date().getFullYear()}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;