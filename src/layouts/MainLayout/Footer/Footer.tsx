import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-[#FAFAFA]">
      <div className="app-container pt-[60px] mb-[75px]">
        <div className="grid grid-cols-[auto_auto_auto_auto_auto] justify-between">
          {/* Exclusive Section */}
          <div className="space-y-[24px]">
            <h3 className="font-inter text-[24px] font-bold">Exclusive</h3>
            <div>
              <h4 className="text-[20px] font-medium mb-[24px]">Subscribe</h4>
              <p className="text-[16px] font-normal mb-[16px]">
                Get 10% off your first order
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="text-[16px] w-full bg-transparent border border-white rounded-[4px] px-5 py-[8px] placeholder-gray-300 focus:border-gray-300"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M9.91199 11.9998H3.99999L2.02299 4.1348C2.01033 4.0891 2.00262 4.04216 1.99999 3.9948C1.97799 3.2738 2.77199 2.7738 3.45999 3.1038L22 11.9998L3.45999 20.8958C2.77999 21.2228 1.99599 20.7368 1.99999 20.0288C2.00201 19.9655 2.01313 19.9029 2.03299 19.8428L3.49999 14.9998"
                      stroke="#FAFAFA"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-[20px] font-medium mb-[24px]">Support</h3>
            <div className="text-[16px] font-normal">
              <p className="mb-[16px]">
                111 Bijoy sarani, Dhaka,
                <br />
                DH 1515, Bangladesh.
              </p>
              <p className="mb-[16px]">exclusive@gmail.com</p>
              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account Section */}
          <div>
            <h3 className="text-[20px] font-medium mb-[24px]">Account</h3>
            <div className="space-y-[16px] text-[16px]">
              <Link to="#" className="block hover:text-gray-300">
                My Account
              </Link>
              <Link to="#" className="block hover:text-gray-300">
                Login / Register
              </Link>
              <Link to="#" className="block hover:text-gray-300">
                Cart
              </Link>
              <Link to="#" className="block hover:text-gray-300">
                Wishlist
              </Link>
              <Link to="#" className="block hover:text-gray-300">
                Shop
              </Link>
            </div>
          </div>

          {/* Quick Link */}
          <div>
            <h3 className="text-[20px] font-medium mb-[24px]">Quick Link</h3>
            <div className="space-y-[16px] text-[16px]">
              <Link to="#" className="block hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link to="#" className="block hover:text-gray-300">
                Terms Of Use
              </Link>
              <Link to="#" className="block hover:text-gray-300">
                FAQ
              </Link>
              <Link to="#" className="block hover:text-gray-300">
                Contact
              </Link>
            </div>
          </div>

          {/* Download App Section */}
          <div>
            <h3 className="text-[20px] font-medium mb-[24px]">Download App</h3>
            <div>
              <p className="text-[16px] opacity-70 mb-[8px]">
                Save $3 with App New User Only
              </p>

              <div className="flex gap-3">{/* QR Code placeholder */}</div>

              {/* Social Media Icons */}
              <div className="flex gap-6 pt-4">
                <a href="#" className="text-white hover:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M13 10H17.5L17 12H13V21H11V12H7V10H11V8.128C11 6.345 11.186 5.698 11.534 5.046C11.875 4.40181 12.4018 3.87501 13.046 3.534C13.698 3.186 14.345 3 16.128 3C16.65 3 17.108 3.05 17.5 3.15V5H16.128C14.804 5 14.401 5.078 13.99 5.298C13.686 5.46 13.46 5.686 13.298 5.99C13.078 6.401 13 6.804 13 8.128V10Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="24"
                    viewBox="0 0 23 24"
                    fill="none"
                  >
                    <path
                      d="M14.1211 4.44336C14.9979 4.09254 15.9592 4.00852 16.8838 4.20117C17.8082 4.39388 18.6557 4.85462 19.3193 5.52637L19.3486 5.55664H19.3906C19.7296 5.55426 20.0806 5.59738 20.498 5.53809C20.882 5.48352 21.3278 5.34203 21.915 5.00977C21.6091 6.49447 21.4324 7.16729 20.7646 8.08301L20.7451 8.10938V8.14258C20.7451 11.9414 19.5781 14.7564 17.8262 16.7393C16.0729 18.7234 13.7275 19.8816 11.3623 20.3535C9.7452 20.6761 7.754 20.5731 5.99609 20.2109C5.11794 20.03 4.30096 19.7842 3.62012 19.4971C3.03699 19.2511 2.56006 18.9759 2.22949 18.6885C2.6606 18.6463 3.41195 18.553 4.24414 18.3594C5.24389 18.1267 6.37194 17.749 7.20312 17.1406L7.31934 17.0557L7.19922 16.9766C6.50766 16.5207 4.81165 15.4984 3.73145 13.5166C2.66701 11.5637 2.19288 8.66296 3.91406 4.42578C5.57929 6.34325 7.27273 7.66041 8.99512 8.36719C9.57627 8.60556 9.94226 8.72333 10.2314 8.79102C10.5195 8.85841 10.7322 8.8754 10.9922 8.91113L11.2871 8.95215L11.1074 8.77148C11.1323 7.84188 11.4255 6.93867 11.9541 6.17285C12.4906 5.3958 13.2444 4.79414 14.1211 4.44336ZM15.9053 5.90137C15.119 5.90124 14.3638 6.20994 13.8027 6.76074C13.3119 7.24267 13.0038 7.87627 12.9248 8.55371L12.9053 8.84668L12.877 10.4209C12.8756 10.4914 12.8592 10.5613 12.8291 10.625C12.799 10.6887 12.7556 10.7452 12.7021 10.791C12.6487 10.8368 12.5861 10.8716 12.5186 10.8916C12.4511 10.9115 12.3802 10.9166 12.3105 10.9072L10.749 10.6953C8.71753 10.4183 6.7663 9.48248 4.88965 7.91895L4.75781 7.80859L4.72754 7.97754C4.42573 9.64812 4.56793 11.0709 5.14746 12.3018C5.72674 13.532 6.73875 14.5607 8.15625 15.4521L9.90234 16.5498C9.97145 16.5932 10.0296 16.6529 10.0703 16.7236C10.111 16.7944 10.1339 16.8744 10.1367 16.9561C10.1395 17.0377 10.1217 17.1189 10.0859 17.1924C10.0501 17.2658 9.99667 17.3299 9.93066 17.3779L8.33887 18.541L8.11523 18.7041L8.3916 18.7207C9.34472 18.7801 10.2532 18.738 11.0098 18.5879C13.3887 18.1129 15.375 16.9789 16.7656 15.2207C18.1559 13.4627 18.9453 11.0883 18.9453 8.14258C18.9453 7.99705 18.8715 7.78499 18.7441 7.55762C18.6144 7.32598 18.4211 7.06491 18.167 6.82031C17.6584 6.33085 16.8999 5.90145 15.9053 5.90137Z"
                      fill="white"
                      stroke="black"
                      strokeWidth="0.2"
                    />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M15 1H5C3.93913 1 2.92172 1.42143 2.17157 2.17157C1.42143 2.92172 1 3.93913 1 5V15C1 16.0609 1.42143 17.0783 2.17157 17.8284C2.92172 18.5786 3.93913 19 5 19H15C16.0609 19 17.0783 18.5786 17.8284 17.8284C18.5786 17.0783 19 16.0609 19 15V5C19 3.93913 18.5786 2.92172 17.8284 2.17157C17.0783 1.42143 16.0609 1 15 1Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 14C11.0609 14 12.0783 13.5786 12.8284 12.8284C13.5786 12.0783 14 11.0609 14 10C14 8.93913 13.5786 7.92172 12.8284 7.17157C12.0783 6.42143 11.0609 6 10 6C8.93913 6 7.92172 6.42143 7.17157 7.17157C6.42143 7.92172 6 8.93913 6 10C6 11.0609 6.42143 12.0783 7.17157 12.8284C7.92172 13.5786 8.93913 14 10 14V14Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M15.5 5.5C15.7652 5.5 16.0196 5.39464 16.2071 5.20711C16.3946 5.01957 16.5 4.76522 16.5 4.5C16.5 4.23478 16.3946 3.98043 16.2071 3.79289C16.0196 3.60536 15.7652 3.5 15.5 3.5C15.2348 3.5 14.9804 3.60536 14.7929 3.79289C14.6054 3.98043 14.5 4.23478 14.5 4.5C14.5 4.76522 14.6054 5.01957 14.7929 5.20711C14.9804 5.39464 15.2348 5.5 15.5 5.5Z"
                      fill="white"
                    />
                  </svg>
                </a>
                <a href="#" className="text-white hover:text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M8.5 6.05C9.417 5.113 10.611 4.5 12 4.5C13.4587 4.5 14.8576 5.07946 15.8891 6.11091C16.9205 7.14236 17.5 8.54131 17.5 10V17.5H15.5V10C15.5 9.07174 15.1313 8.1815 14.4749 7.52513C13.8185 6.86875 12.9283 6.5 12 6.5C11.0717 6.5 10.1815 6.86875 9.52513 7.52513C8.86875 8.1815 8.5 9.07174 8.5 10V17.5H6.5V5H8.5V6.05ZM1.5 3C1.10218 3 0.720644 2.84196 0.43934 2.56066C0.158035 2.27936 0 1.89782 0 1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0C1.89782 0 2.27936 0.158035 2.56066 0.43934C2.84196 0.720644 3 1.10218 3 1.5C3 1.89782 2.84196 2.27936 2.56066 2.56066C2.27936 2.84196 1.89782 3 1.5 3ZM0.5 5H2.5V17.5H0.5V5Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-900">
        <div className="text-[16px] opacity-80 app-container mt-[16px] mb-[24px]">
          <p className="text-center text-gray-400">
            © Copyright Rimel 2022. All right reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
