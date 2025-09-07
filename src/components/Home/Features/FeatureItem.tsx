import type { FeatureItem } from "@/types/featureItem";
import Image from "next/image";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const FeatureItem = ({ data }: { data: FeatureItem }) => {
  return (
    <div className="relative min-h-[300px] list-none">
      <div className="relative h-full rounded-[15px] border-[0.75px] border-stroke p-2 dark:border-stroke-dark">
        <GlowingEffect
          spread={30}
          glow={true}
          disabled={false}
          proximity={48}
          inactiveZone={0.1}
          borderWidth={3}
          movementDuration={1.5}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-white p-[35px] shadow-1 hover:shadow-features dark:bg-gray-dark dark:border-stroke-dark dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)]">
          <div className="relative flex flex-1 flex-col justify-start gap-6">
            <div className="w-fit rounded-lg border-[1.5px] border-stroke bg-gray-1 p-3 dark:border-stroke-dark dark:bg-gray-dark">
              <Image src={data.icon} alt={data?.title} width={40} height={40} />
            </div>
            <div className="space-y-4">
              <h3 className="pt-0.5 text-2xl leading-[1.375rem] font-bold font-satoshi tracking-[-0.04em] text-balance text-dark dark:text-white">
                {data.title}
              </h3>
              <p className="font-satoshi text-base leading-[1.375rem] text-body dark:text-gray-5">
                {data.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureItem;
