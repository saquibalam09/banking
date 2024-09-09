import HeaderBox from '@/components/HeaderBox';
import RightSidebar from '@/components/RightSidebar';
import TotalBalanceBox from '@/components/TotalBalanceBox';
import React from 'react'

function Home() {

    const loggedIn = {firstName: 'Saquib', lastName: 'Alam', email: 'saquib@gmail.com'}
  return (
    <section className='home'>
        <div className='home-content'>
            <header className='home-header'>
                <HeaderBox
                    type='greeting'
                    title='Welcome'
                    user={loggedIn?.firstName || 'Guest'}
                    subtext='Access and manage your account and transactions efficiently.'
                />
                <TotalBalanceBox
                    accounts={[]}
                    totalBanks={1}
                    totalCurrentBalance = {1020.55}
                />
            </header>
            RECENT TRANSACTIONS
        </div>
        <div>
            <RightSidebar
                user={loggedIn}
                transactions={[]}
                banks={[{currentBalance: 273.43},{currentBalance: 274.3}]}
            />
        </div>
    </section>
  )
}

export default Home;