import Link from "next/link";
import Image from "next/image";
import AddNewText from "@/components/AddNewText";

/* TODO separate typography into components */

const FeaturedTexts = () => {
  return (
    <>
      <AddNewText />
      <div className="flex max-w-full flex-1 flex-col gap-4">
        <div>
          <h2 className="font-semibold text-lg leading-6 tracking-tight">
            Continue reading from where you left
          </h2>
          <p className="text-sm text-muted-foreground">Resume your journey.</p>
        </div>
        <div className="flex min-w-[20rem] flex-wrap gap-5 lg:flex-nowrap">
          {/* TODO separate into its own component */}
          {/* TODO dynamic aria labels */}
          {/* TODO wrap this into suspense */}
          <div className="flex w-36 flex-none flex-col gap-4 lg:w-40">
            <Link
              href="#"
              aria-label="Open Text"
              className="block rounded-md ring-offset-1 transition-opacity hover:opacity-80 hover:transition-none focus:outline-focus"
            >
              <Image
                width={160}
                height={160}
                className="aspect-square w-full rounded-md bg-bgTintedBase"
                src="https://media.newyorker.com/photos/6584b5c7819f49f186546a34/master/w_2240,c_limit/240101_r43563.jpg"
                alt="some alt"
              />
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Link aria-hidden href="#" className="hover:underline">
                  <h4>How a Script Doctor Found His Own Voice</h4>
                </Link>
                <span className="text-sm text-muted-foreground">
                  New Yorker
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-36 flex-none flex-col gap-4 lg:w-40">
            <Link
              href="#"
              aria-label="Open Text"
              className="block rounded-md ring-offset-1 transition-opacity hover:opacity-80 hover:transition-none focus:outline-focus"
            >
              <Image
                width={100}
                height={160}
                className="aspect-square w-full rounded-md bg-bgTintedBase"
                src="https://media.newyorker.com/photos/65820d4c603d5e5d08d74af1/master/w_2240,c_limit/Cadava-Citizen-Smugglers.jpg"
                alt="some alt"
              />
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Link aria-hidden href="#" className="hover:underline">
                  <h4>When Americans Are the Threat at the Border</h4>
                </Link>
                <span className="text-sm text-muted-foreground">
                  New Yorker
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-36 flex-none flex-col gap-4 lg:w-40">
            <Link
              href="#"
              aria-label="Open Text"
              className="block rounded-md ring-offset-1 transition-opacity hover:opacity-80 hover:transition-none focus:outline-focus"
            >
              <Image
                width={100}
                height={160}
                className="aspect-square w-full rounded-md bg-bgTintedBase"
                src="https://media.newyorker.com/photos/6580839d3d0e5436728a0155/master/w_2240,c_limit/Knight-Ransomeware-Hack.jpg"
                alt="some alt"
              />
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Link aria-hidden href="#" className="hover:underline">
                  <h4>
                    The Disturbing Impact of the Cyberattack at the British
                    Library
                  </h4>
                </Link>
                <span className="text-sm text-muted-foreground">
                  New Yorker
                </span>
              </div>
            </div>
          </div>

          <div className="flex w-36 flex-none flex-col gap-4 lg:w-40">
            <Link
              href="#"
              aria-label="Open Text"
              className="block rounded-md ring-offset-1 transition-opacity hover:opacity-80 hover:transition-none focus:outline-focus"
            >
              <Image
                width={100}
                height={160}
                className="aspect-square w-full rounded-md bg-bgTintedBase"
                src="https://media.newyorker.com/photos/657a1a5fd342198010b4e89f/4:3/w_2240,c_limit/Theater_Final.jpg"
                alt="some alt"
              />
            </Link>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <Link aria-hidden href="#" className="hover:underline">
                  <h4>This Year’s Best Theatre</h4>
                </Link>
                <span className="text-sm text-muted-foreground">
                  New Yorker
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedTexts;
