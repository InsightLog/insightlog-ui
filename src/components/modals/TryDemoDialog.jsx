import { Dialog } from "@headlessui/react";

export default function TryDemoDialog({ open, onClose }) {
    return (
        <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center px-2">
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
            <div className="bg-[#1e1e2f] text-white p-5 sm:p-6 rounded-xl w-full max-w-md z-50 border border-white/10 relative">
                <Dialog.Title className="text-lg font-bold mb-4 flex justify-between items-center">
                    Try InsightLog Demo
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-xl font-bold focus:outline-none"
                    >
                        &times;
                    </button>
                </Dialog.Title>

                <p className="text-gray-300 text-sm mb-2">
                    Use the following demo accounts to explore the dashboard and features:
                </p>

                <div className="bg-gray-900 text-sm rounded-lg px-4 py-3 mb-4 space-y-4 font-mono text-white">
                    <div>
                        <span className="text-cyan-400">Admin Account</span><br />
                        Email: <code>admin@demo.com</code><br />
                        Password: <code>admin123</code>
                    </div>
                    <div>
                        <span className="text-green-400">Member Account</span><br />
                        Email: <code>member@demo.com</code><br />
                        Password: <code>member123</code>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
