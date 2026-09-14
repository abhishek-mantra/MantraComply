import svgPaths from "./svg-2ilfe38tq5";
import imgImg from "figma:asset/5e574934de7a9ddece0deb3a9d66ac14bd046cb9.png";

function Menu() {
  return (
    <div className="h-[24px] overflow-clip relative shrink-0 w-full" data-name="Menu">
      <div className="absolute bottom-1/2 left-[16.67%] right-[16.67%] top-1/2" data-name="Vector">
        <div className="absolute inset-[-1px_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 2">
            <path d="M1 1H17" id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-3/4 left-[16.67%] right-[16.67%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-1px_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 2">
            <path d="M1 1H17" id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-1/4 left-[16.67%] right-[16.67%] top-3/4" data-name="Vector">
        <div className="absolute inset-[-1px_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 2">
            <path d="M1 1H17" id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Menu />
      </div>
    </div>
  );
}

function Img() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="img">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImg} />
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#d1d5dc] relative rounded-[33554400px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] size-full">
        <Img />
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Button />
      <Container2 />
    </div>
  );
}

function Container() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[73px] items-start left-0 pb-px pt-[16px] px-[312.5px] top-0 w-[1905px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Container1 />
    </div>
  );
}

function Container4() {
  return <div className="h-[764px] shrink-0 w-[256px]" data-name="Container" />;
}

function H() {
  return (
    <div className="h-[32px] relative shrink-0 w-[359.078px]" data-name="h1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[32px] not-italic relative shrink-0 text-[#101828] text-[24px]">National Provider Identifier (NPI)</p>
      </div>
    </div>
  );
}

function Span() {
  return (
    <div className="h-[20px] relative shrink-0 w-[74.031px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px]">Step 1 of 17</p>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex h-[32px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <H />
      <Span />
    </div>
  );
}

function Container10() {
  return <div className="bg-[#155dfc] h-[4px] shrink-0 w-full" data-name="Container" />;
}

function Container9() {
  return (
    <div className="bg-[#e5e7eb] h-[4px] relative rounded-[33554400px] shrink-0 w-full" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start pr-[826.359px] relative size-full">
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] h-[44px] items-start left-[33px] top-[33px] w-[878px]" data-name="Container">
      <Container8 />
      <Container9 />
    </div>
  );
}

function Label() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[0] min-h-px min-w-px not-italic relative text-[#364153] text-[14px] whitespace-pre-wrap">
        <span className="leading-[20px]">{`Select your service `}</span>
        <span className="leading-[20px] text-[#fb2c36]">*</span>
      </p>
    </div>
  );
}

function Option() {
  return <div className="absolute left-[-657.5px] size-0 top-[-232px]" data-name="option" />;
}

function Option1() {
  return <div className="absolute left-[-657.5px] size-0 top-[-232px]" data-name="option" />;
}

function Option2() {
  return <div className="absolute left-[-657.5px] size-0 top-[-232px]" data-name="option" />;
}

function Option3() {
  return <div className="absolute left-[-657.5px] size-0 top-[-232px]" data-name="option" />;
}

function Select() {
  return (
    <div className="h-[41px] relative rounded-[10px] shrink-0 w-full" data-name="select">
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <Option />
      <Option1 />
      <Option2 />
      <Option3 />
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[67px] items-start relative shrink-0 w-full" data-name="Container">
      <Label />
      <Select />
    </div>
  );
}

function Span1() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-[74.34px] top-0 w-[6.078px]" data-name="span">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#fb2c36] text-[14px]">*</p>
    </div>
  );
}

function HelpCircle() {
  return (
    <div className="absolute left-[88.42px] size-[16px] top-[2px]" data-name="HelpCircle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_17_275)" id="HelpCircle">
          <path d={svgPaths.p39ee6532} id="Vector" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p11f26280} id="Vector_2" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M8 11.3333H8.00667" id="Vector_3" stroke="var(--stroke-0, #99A1AF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_17_275">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Label1() {
  return (
    <div className="absolute h-[20px] left-0 top-0 w-[878px]" data-name="label">
      <p className="absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-0 not-italic text-[#364153] text-[14px] top-[-1px]">{`Type 1 NPI `}</p>
      <Span1 />
      <HelpCircle />
    </div>
  );
}

function Input() {
  return (
    <div className="absolute h-[42px] left-0 rounded-[10px] top-[26px] w-[878px]" data-name="input">
      <div className="content-stretch flex items-center overflow-clip px-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[16px] text-[rgba(10,10,10,0.5)]">Enter your 10-digit NPI number</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#d1d5dc] border-solid inset-0 pointer-events-none rounded-[10px]" />
    </div>
  );
}

function P() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[72px] w-[878px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] whitespace-pre-wrap">Your National Provider Identifier (NPI) is a 10-digit number.</p>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[88px] relative shrink-0 w-full" data-name="Container">
      <Label1 />
      <Input />
      <P />
    </div>
  );
}

function Label2() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-0 w-[878px]" data-name="label">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[0] min-h-px min-w-px not-italic relative text-[#364153] text-[14px] whitespace-pre-wrap">
        <span className="leading-[20px]">{`Service Type `}</span>
        <span className="leading-[20px] text-[#fb2c36]">*</span>
      </p>
    </div>
  );
}

function P1() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[32px] w-[878px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Italic',sans-serif] font-normal italic leading-[20px] min-h-px min-w-px relative text-[#6a7282] text-[14px] whitespace-pre-wrap">Please select a provider type above first.</p>
    </div>
  );
}

function P2() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-0 top-[60px] w-[878px]" data-name="p">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[0] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] whitespace-pre-wrap">
        <span className="leading-[16px]">{`If you don't have an NPI, you can register for an NPI `}</span>
        <span className="leading-[16px] text-[#155dfc]">here</span>
      </p>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[76px] relative shrink-0 w-full" data-name="Container">
      <Label2 />
      <P1 />
      <P2 />
    </div>
  );
}

function Container11() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[20px] h-[271px] items-start left-[33px] top-[101px] w-[878px]" data-name="Container">
      <Container12 />
      <Container13 />
      <Container14 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f3f4f6] h-[44px] relative rounded-[10px] shrink-0 w-[81.938px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[41px] not-italic text-[#99a1af] text-[16px] text-center top-[8px]">Back</p>
      </div>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#3b82f6] h-[44px] relative rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] shrink-0 w-[199.641px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[24px] left-[100px] not-italic text-[16px] text-center text-white top-[8px]">Save and Continue</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="absolute content-stretch flex h-[69px] items-center justify-between left-[33px] pt-px top-[404px] w-[878px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Button1 />
      <Button2 />
    </div>
  );
}

function Container6() {
  return (
    <div className="bg-white h-[506px] relative rounded-[14px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container7 />
      <Container11 />
      <Container15 />
    </div>
  );
}

function HelpCircle1() {
  return (
    <div className="absolute left-0 size-[20px] top-[2px]" data-name="HelpCircle">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_17_270)" id="HelpCircle">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p22540600} id="Vector_2" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #155DFC)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_17_270">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function H2() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-0 w-[311.125px]" data-name="h3">
      <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] min-h-px min-w-px not-italic relative text-[#101828] text-[14px] whitespace-pre-wrap">Need Help?</p>
    </div>
  );
}

function P3() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[24px] w-[311.125px]" data-name="p">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#364153] text-[14px]">Our credentialing specialists are here to assist you.</p>
    </div>
  );
}

function Button3() {
  return (
    <div className="absolute content-stretch flex h-[20px] items-start left-0 top-[55px] w-[122.75px]" data-name="button">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#155dfc] text-[14px] text-center">Visit Help Center →</p>
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute h-[76px] left-[32px] top-0 w-[311.125px]" data-name="Container">
      <H2 />
      <P3 />
      <Button3 />
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[76px] relative shrink-0 w-full" data-name="Container">
      <HelpCircle1 />
      <Container18 />
    </div>
  );
}

function Container16() {
  return (
    <div className="bg-[#eff6ff] h-[110px] relative rounded-[10px] shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#bedbff] border-solid inset-0 pointer-events-none rounded-[10px]" />
      <div className="content-stretch flex flex-col items-start pb-px pt-[17px] px-[17px] relative size-full">
        <Container17 />
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="flex-[1_0_0] h-[764px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[24px] items-start relative size-full">
        <Container6 />
        <Container16 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="absolute content-stretch flex gap-[32px] h-[828px] items-start left-[312.5px] pt-[32px] px-[24px] top-[73px] w-[1280px]" data-name="Container">
      <Container4 />
      <Container5 />
    </div>
  );
}

function Div() {
  return (
    <div className="bg-[#f5f5f7] h-[901px] relative shrink-0 w-full" data-name="div">
      <Container />
      <Container3 />
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[862px] items-start left-0 top-0 w-[1905px]" data-name="Body">
      <Div />
    </div>
  );
}

function Svg() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="svg">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_17_280)" id="svg">
          <path d={svgPaths.p1a558000} fill="var(--fill-0, white)" id="Vector" />
        </g>
        <defs>
          <clipPath id="clip0_17_280">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Container19() {
  return (
    <div className="bg-[#155dfc] relative rounded-[4px] shrink-0 size-[24px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Svg />
      </div>
    </div>
  );
}

function Span2() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-h-px min-w-px relative" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[28px] left-0 not-italic text-[#101828] text-[18px] top-[-1px]">Mantra</p>
      </div>
    </div>
  );
}

function Div1() {
  return (
    <div className="absolute content-stretch flex gap-[8px] h-[28px] items-center left-[906.95px] top-[22px] w-[91.109px]" data-name="div">
      <Container19 />
      <Span2 />
    </div>
  );
}

function ChevronLeft() {
  return (
    <div className="h-[20px] overflow-clip relative shrink-0 w-full" data-name="ChevronLeft">
      <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-name="Vector">
        <div className="absolute inset-[-8.33%_-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6.66667 11.6667">
            <path d={svgPaths.p3a0d2780} id="Vector" stroke="var(--stroke-0, #364153)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button4() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <ChevronLeft />
      </div>
    </div>
  );
}

function H1() {
  return (
    <div className="h-[20px] relative shrink-0 w-[85.188px]" data-name="h2">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#101828] text-[14px]">Credentialing</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex gap-[8px] h-[37px] items-center pb-px relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <Button4 />
      <H1 />
    </div>
  );
}

function Span3() {
  return (
    <div className="h-[16px] relative shrink-0 w-[179.547px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#1447e6] text-[12px]">National Provider Identifier (NPI)</p>
      </div>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#eff6ff] h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[30.453px] relative size-full">
          <Span3 />
        </div>
      </div>
    </div>
  );
}

function Span4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[111.313px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">CAQH Authorization</p>
      </div>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[98.688px] relative size-full">
          <Span4 />
        </div>
      </div>
    </div>
  );
}

function Span5() {
  return (
    <div className="h-[16px] relative shrink-0 w-[129.828px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">CAQH Account Updates</p>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[80.172px] relative size-full">
          <Span5 />
        </div>
      </div>
    </div>
  );
}

function Span6() {
  return (
    <div className="h-[16px] relative shrink-0 w-[114.328px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Personal Information</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[95.672px] relative size-full">
          <Span6 />
        </div>
      </div>
    </div>
  );
}

function Span7() {
  return (
    <div className="h-[16px] relative shrink-0 w-[107.656px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">License Information</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[102.344px] relative size-full">
          <Span7 />
        </div>
      </div>
    </div>
  );
}

function Span8() {
  return (
    <div className="h-[16px] relative shrink-0 w-[102.313px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Board Certification</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[107.688px] relative size-full">
          <Span8 />
        </div>
      </div>
    </div>
  );
}

function Span9() {
  return (
    <div className="h-[16px] relative shrink-0 w-[131.641px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Malpractice Information</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[78.359px] relative size-full">
          <Span9 />
        </div>
      </div>
    </div>
  );
}

function Span10() {
  return (
    <div className="h-[16px] relative shrink-0 w-[54px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Education</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[156px] relative size-full">
          <Span10 />
        </div>
      </div>
    </div>
  );
}

function Span11() {
  return (
    <div className="h-[16px] relative shrink-0 w-[136.891px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Employment Information</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[73.109px] relative size-full">
          <Span11 />
        </div>
      </div>
    </div>
  );
}

function Span12() {
  return (
    <div className="h-[16px] relative shrink-0 w-[110.938px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Practice Information</p>
      </div>
    </div>
  );
}

function Button14() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[99.063px] relative size-full">
          <Span12 />
        </div>
      </div>
    </div>
  );
}

function Span13() {
  return (
    <div className="h-[16px] relative shrink-0 w-[64.531px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Focus Areas</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[145.469px] relative size-full">
          <Span13 />
        </div>
      </div>
    </div>
  );
}

function Span14() {
  return (
    <div className="h-[16px] relative shrink-0 w-[103.203px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Practice Modalities</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[106.797px] relative size-full">
          <Span14 />
        </div>
      </div>
    </div>
  );
}

function Span15() {
  return (
    <div className="h-[16px] relative shrink-0 w-[104.563px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Practice Languages</p>
      </div>
    </div>
  );
}

function Button17() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[105.438px] relative size-full">
          <Span15 />
        </div>
      </div>
    </div>
  );
}

function Span16() {
  return (
    <div className="h-[16px] relative shrink-0 w-[128.531px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Current Insurance Plans</p>
      </div>
    </div>
  );
}

function Button18() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[81.469px] relative size-full">
          <Span16 />
        </div>
      </div>
    </div>
  );
}

function Span17() {
  return (
    <div className="h-[16px] relative shrink-0 w-[80.859px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Current Clients</p>
      </div>
    </div>
  );
}

function Button19() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[129.141px] relative size-full">
          <Span17 />
        </div>
      </div>
    </div>
  );
}

function Span18() {
  return (
    <div className="h-[16px] relative shrink-0 w-[77.594px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Release Forms</p>
      </div>
    </div>
  );
}

function Button20() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[132.406px] relative size-full">
          <Span18 />
        </div>
      </div>
    </div>
  );
}

function Span19() {
  return (
    <div className="h-[16px] relative shrink-0 w-[84.297px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#6a7282] text-[12px]">Insurance Plans</p>
      </div>
    </div>
  );
}

function Button21() {
  return (
    <div className="h-[32px] relative rounded-[10px] shrink-0 w-full" data-name="button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pl-[12px] pr-[125.703px] relative size-full">
          <Span19 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[608px] items-start relative shrink-0 w-full" data-name="Container">
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
      <Button13 />
      <Button14 />
      <Button15 />
      <Button16 />
      <Button17 />
      <Button18 />
      <Button19 />
      <Button20 />
      <Button21 />
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Container">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#6a7282] text-[12px] whitespace-pre-wrap">Progress</p>
    </div>
  );
}

function Container26() {
  return <div className="bg-[#155dfc] h-[8px] shrink-0 w-full" data-name="Container" />;
}

function Container25() {
  return (
    <div className="bg-[#e5e7eb] flex-[1_0_0] h-[8px] min-h-px min-w-px relative rounded-[33554400px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-[191.094px] relative size-full">
          <Container26 />
        </div>
      </div>
    </div>
  );
}

function Span20() {
  return (
    <div className="h-[16px] relative shrink-0 w-[22.906px]" data-name="span">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#364153] text-[12px]">0/17</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex gap-[8px] h-[16px] items-center relative shrink-0 w-full" data-name="Container">
      <Container25 />
      <Span20 />
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[53px] items-start pt-[17px] relative shrink-0 w-full" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <Container23 />
      <Container24 />
    </div>
  );
}

function Div2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col gap-[16px] h-[764px] items-start left-[336.5px] pb-px pt-[17px] px-[17px] rounded-[14px] top-[105px] w-[256px]" data-name="div">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[14px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container20 />
      <Container21 />
      <Container22 />
    </div>
  );
}

export default function ExpertViewClientProfileUi() {
  return (
    <div className="bg-white relative size-full" data-name="Expert View Client Profile UI">
      <Body />
      <Div1 />
      <Div2 />
    </div>
  );
}