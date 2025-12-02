import React from "react";

const FeatureItem = ({ icon, color, title }) => (
  <div className="flex flex-1 gap-3 items-center">
    <div className="text-primary">
      <span className="material-symbols-outlined text-4xl" style={{ color }}>
        {icon}
      </span>
    </div>
    <h2 className="text-gray-800 dark:text-gray-200 text-sm font-bold leading-tight">
      {title}
    </h2>
  </div>
);

const LogoItem = ({ imageUrl, alt }) => (
  <div className="flex flex-col gap-3 items-center justify-center">
    <div
      className="h-10 w-32 bg-center bg-no-repeat bg-contain"
      style={{ backgroundImage: `url(${imageUrl})`, filter: "grayscale(1) brightness(0.5) contrast(0.5)" }}
      data-alt={alt}
    ></div>
  </div>
);

const WelcomeScreen = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark group/design-root overflow-x-hidden font-display">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 lg:px-10 xl:px-40 flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 w-full">

            {/* Header */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-primary/20 dark:border-primary/10 px-4 sm:px-10 py-3">
              <div className="flex items-center gap-4 text-gray-800 dark:text-gray-200">
                <div className="size-8 text-primary">
                  {/* Logo SVG */}
                  <svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG paths buraya */}
                  </svg>
                </div>
                <h2 className="text-gray-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Akıllı Beslenme</h2>
              </div>
              <div className="hidden md:flex flex-1 justify-end items-center gap-8">
                <div className="flex items-center gap-9">
                  {["Features","How It Works","Pricing","Contact"].map((link) => (
                    <a key={link} className="text-gray-800 dark:text-gray-300 text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" href="#">
                      {link}
                    </a>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-lg h-10 px-4 bg-primary/20 text-gray-800 dark:text-white text-sm font-bold hover:bg-primary/30">
                    Log In
                  </button>
                  <button className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-lg h-10 px-4 bg-primary text-gray-900 text-sm font-bold hover:opacity-90">
                    Sign Up
                  </button>
                </div>
              </div>
            </header>

            {/* Main */}
            <main className="flex-1">
              {/* Hero Section */}
              <div className="@container">
                <div className="flex flex-col gap-12 px-4 py-10 @[864px]:flex-row @[864px]:items-center">
                  
                  {/* Text Content */}
                  <div className="flex flex-col gap-8 @[864px]:justify-center @[864px]:w-1/2">
                    <div className="flex flex-col gap-4 text-left">
                      <h1 className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl">
                        Your Smart Nutrition & Fitness Planner
                      </h1>
                      <h2 className="text-gray-700 dark:text-gray-300 text-base font-normal leading-relaxed @[480px]:text-lg">
                        Personalized meal and workout plans created from the ingredients you already have. Eat smarter, train better.
                      </h2>
                    </div>

                    {/* Features */}
                    <div className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-0">
                        <FeatureItem icon="psychology" color="#fbcf33" title="AI-Powered Personalization" />
                        <FeatureItem icon="recycling" color="#2dce89" title="Reduce Food Waste" />
                        <FeatureItem icon="trending_up" color="#f56036" title="Achieve Your Goals" />
                      </div>
                    </div>

                    <button className="flex min-w-[84px] max-w-[480px] items-center justify-center rounded-lg h-12 px-5 bg-primary text-gray-900 dark:text-gray-900 text-base font-bold hover:opacity-90">
                      Get Started for Free
                    </button>
                  </div>

                  {/* Hero Image */}
                  <div className="w-full @[864px]:w-1/2">
                    <div
                      className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
                      style={{
                        backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-q84cCm23dcsmuAxVVyGgBhtmFXJASqS2AFm6QOg8pyISbrk087bblhghHNandCCAQS8h1LdUqK8UPhwH9ANf6YckgmkC7yPHXyBve2ANDxgcqm0iYkNDC3zDgfRRSQQFS6TgNFR80TLWGI47FNFisxB-ed4qx1Ff2Cr7rdC3nZVFEij5AW-BWad-wy_kycOW80GgTavC7IG-ukRAseC-eMph-me--OHNweFGp26-z7vOY3BKd1FDK6tWCIMPQmKKJyZJk97hmQWK")`
                      }}
                      data-alt="A vibrant collage of healthy foods like avocado and berries, a smartwatch showing activity rings, and a clean app interface element."
                    ></div>
                  </div>
                </div>
              </div>

              {/* Logos Section */}
              <div className="flex flex-col gap-10 px-4 py-10 @container">
                <h4 className="text-gray-600 dark:text-gray-400 text-sm font-bold leading-normal tracking-[0.015em] text-center">
                  TRUSTED BY THOUSANDS OF HEALTH ENTHUSIASTS
                </h4>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
                  <LogoItem imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuB8hJLwFozVfUonMEhJ-L01XopSlUa7wMUzrIGwLjqxzLvP-XHrdlucgEJbcm4YJgovyKW3yGK-gMEBX-KR3EJEt6DV0XoKHMmGXsdleAFVJ8INosSY_WyD8pHkMzHCgf8dC1T_HFvVrFEJODAYHLLgnkuoTkR11qntCU5hcgHT7YDfbfE59HhmyRD6DnUIx6WZYBxqliYjGTQN4gYwilYubPDuntWr6R5KaIcUExdiYyCrexthUL2JpjSQ41LDTxlMuzVnWOUAxlVL" alt="Fitbit logo" />
                  <LogoItem imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuD5OvhKJWpd1mgWOII7pHAk7uUwe5aF-mXnQ8_XCKyjjwJ7qnktQZ0XHMcZBj-IdEn3gwlHW1gVlPI_09rku5KogcuPt0m6DJCGMqrSgwbCtVIrYDuUj9NJElPIka_lIHVElLVnwtZ0LPVO6xxFcUUZyLPEjtzooMi5V-gmUS-ENgQHWk6MLY74sABYV_ecwUMBIJ1mgKVVESyPasQG2YL_jF8UehRu_Ny-5JyWzAPewNzbhCNEWbLwdLlm6MO1V_pXwRIIQgKtC1la" alt="MyFitnessPal logo" />
                  <LogoItem imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuDeo3vhaHXg3E4GrwS3Ncff4LXCYuNkSZ0pSoK6omKiBRcJE1CRwCRBZQFgr-pnK5BPd2h_IrTAtEflfGghTm_-7c-5EiaZW1y2yeuaTLRwOCfsveVe1TN0kqWnth-3uL15IDkl69nAFNr3fNNgh3YYsf9UZCdsNQMeyhJb_bKSrd3YgaEZVE0XXkgdzc9Y32JqiwhTHoIrxcvRACutn4D3Ffm56MtF0OoauM9pBTqFzy6GeKdF8n5va7HaDV6DMs8OYsBsVpzsOFlW" alt="Notion logo" />
                  <LogoItem imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAajHzYPld9HlV6uQQ9fKUi8JhVt65qn1GSid2ZmFdBrvFDZBy4K6bPVG9gCZ_I2ElLJ8FZLE5eiOHmlAwQvG7YHFRKFOdMGvsiRZC1opnWaDQu57toQ6HL0c1XKQ7z3AxcxXN_nSHwTn_plqw7Q9rkTTsCTb2N32ogYwLMaXGQ-OZQ9GJf1s2WfeeEqmj7qDCcQZgAKnu5k-_a4U33I1ciTmpxkV7JZTe--xF6Em4BNXZiIdmYAoa8LFMBg_eIS8bY6ztCah89-qqQ" alt="Apple Health logo" />
                  <LogoItem imageUrl="https://lh3.googleusercontent.com/aida-public/AB6AXuAgAEEhBsAlbDEd-wyiy50TJZmij_besfrSj4VFJR-53dKxFCknRUe-DNa2gwfw58pDMk5KEODcUW74Pxheuf2HY2vX_Ra6czvhxaJG8Hq925UHdyqK921ylefEfk9GuiqgghulzKSZ2u1pnjpOKmR-PWsTHYtwUfOsacwnRKvlDcr6SYNj1hOqxoVC00Jein2HNBRAqbcyi1WfDBsO6V9PAmfcXRQMP2pgZoFDICpISzGk63-_T9uBBZX2NkGJ9KH2tIvz5EL6DiAO" alt="Strava logo" />
                </div>
              </div>

            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
