'use client';
import CountUp from "react-countup";

function AnimatedCounter({amount}: {amount : number}) {
  return (
    <div className="w-full">
        <CountUp 
            decimal=","
            prefix="$"
            duration={2}
            decimals={2}
            end={amount} />
    </div>
  )
}

export default AnimatedCounter;