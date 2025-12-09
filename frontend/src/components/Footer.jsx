import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faLinkedin,
  faGithub,
 
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";


export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
       
        <div>
          <h2 className="text-xl font-bold text-white">TrackIt</h2>
          <p className="mt-2 text-sm">
            100% free expense tracking. Track, plan, and succeed with your finances.
          </p>
          <div className="mt-4 flex gap-4 text-lg text-slate-400">
            <a href="https://twitter.com" aria-label="Twitter">
              <FontAwesomeIcon icon={faTwitter} className="hover:text-white" />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} className="hover:text-white" />
            </a>
            <a href="https://github.com" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} className="hover:text-white" />
            </a>
            <a href="mailto:support@trackit.com" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} className="hover:text-white" />
            </a>
          </div>
        </div>

  
        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Features</a></li>
            <li><a href="#" className="hover:text-white">How It Works</a></li>
            <li><a href="#" className="hover:text-white">Security</a></li>
            <li><a href="#" className="hover:text-white">Integrations</a></li>
          </ul>
        </div>


        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">About Us</a></li>
            <li><a href="#" className="hover:text-white">Careers</a></li>
            <li><a href="#" className="hover:text-white">Blog</a></li>
            <li><a href="#" className="hover:text-white">Press</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Help Center</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Terms of Service</a></li>
          </ul>
        </div>
      </div>


      <div className="mt-12 border-t border-slate-700 pt-6 text-center text-xs text-slate-400">
        <p>© 2025 TrackIt. All rights reserved. Free forever.</p>
        <div className="mt-2 flex justify-center gap-4">
          <a href="#" className="hover:text-white">Privacy</a>
          <a href="#" className="hover:text-white">Terms</a>
          <a href="#" className="hover:text-white">Cookies</a>
        </div>
      </div>
    </footer>
  );
}