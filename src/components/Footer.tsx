'use client';

import Link from 'next/link';
import {Github, Linkedin, Youtube} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
                    {/* Column 1 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Events</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/competitions" className="hover:text-white transition-colors">
                                    Competitions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Opportunities</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/jobs" className="hover:text-white transition-colors">
                                    Jobs Board
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Info</h3>
                        <ul className="space-y-2">
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

                    {/* Column 5 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Business</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/host" className="hover:text-white transition-colors">
                                    Host competition
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Column 6 */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Contacts</h3>
                        <div className="space-y-4">
                            <div className="flex space-x-4">
                                {/*<a href="#" className="hover:text-white">*/}
                                {/*    <X className="h-5 w-5"/>*/}
                                {/*</a>*/}
                                <a href="#" className="hover:text-white">
                                    <Linkedin className="h-5 w-5"/>
                                </a>
                                <a href="#" className="hover:text-white">
                                    <Github className="h-5 w-5"/>
                                </a>
                                <a href="#" className="hover:text-white">
                                    <Youtube className="h-5 w-5"/>
                                </a>
                            </div>
                            <p className="text-sm">contact@hivetensor.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;