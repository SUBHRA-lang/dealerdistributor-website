import React from 'react';
import { Scale, ShieldCheck, HelpCircle, FileText, AlertCircle, Info } from 'lucide-react';

const Terms = () => {
  const sections = [
    {
      title: "Defined Terms",
      icon: Info,
      content: [
        "**Company**: Refers to DealerDistributors.com and its operating entity.",
        "**User**: Any individual or legal entity visiting or using the services of the Portal.",
        "**Portal**: The website DealerDistributors.com and all its subdomains.",
        "**Services**: Any and all services provided by the Company through the Portal."
      ]
    },
    {
      title: "Illegal and Prohibited Content",
      icon: AlertCircle,
      content: [
        "Users are prohibited from posting content that is defamatory, obscene, pornographic, or otherwise illegal.",
        "Any content that infringes upon the intellectual property rights of others is strictly forbidden.",
        "The Company reserves the right to remove any prohibited content without prior notice to the User.",
        "Spamming, phishing, or spreading malware through the Portal is strictly prohibited."
      ]
    },
    {
      title: "Agreement Between User and Company",
      icon: FileText,
      content: [
        "By accessing the Portal, the User agrees to be bound by these Terms and Conditions.",
        "The services are provided on an 'as-is' and 'as-available' basis without any warranties.",
        "Users are responsible for maintaining the confidentiality of their account credentials.",
        "All interactions between users are the sole responsibility of the parties involved."
      ]
    },
    {
      title: "Amendments and Modifications",
      icon: Scale,
      content: [
        "The Company reserves the right to modify these terms at any time without prior consent.",
        "Continued use of the Portal after modifications constitutes acceptance of the new terms.",
        "Users are encouraged to review the Terms and Conditions periodically for updates."
      ]
    },
    {
      title: "Warranties and Disclaimer",
      icon: ShieldCheck,
      content: [
        "The Company does not warrant that the Portal will be error-free or uninterrupted.",
        "The Portal is not responsible for the quality or legitimacy of the business opportunities posted.",
        "Liability for any indirect or consequential damages is limited to the maximum extent permitted by law."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-[#2C3E95] py-24 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <div className="inline-block p-3 bg-white/10 rounded-2xl mb-6 backdrop-blur-sm">
            <Scale className="w-12 h-12 text-orange-500" />
          </div>
          <h1 className="text-5xl font-black mb-6">Terms & Conditions</h1>
          <p className="text-xl text-blue-100/80 font-medium">
            Please read these terms carefully before using our platform. Your use of DealerDistributors.com signifies your agreement to these conditions.
          </p>
          <div className="mt-8 text-sm text-blue-100/60 flex items-center justify-center gap-2 uppercase tracking-widest font-bold">
            <AlertCircle className="w-4 h-4" />
            Last Updated: January 2025
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="prose prose-blue max-w-none">
          <div className="space-y-16">
            {sections.map((section, idx) => (
              <section key={idx} className="relative pl-12">
                {/* Decorative Timeline Line */}
                <div className="absolute left-6 top-8 bottom-[-4rem] w-0.5 bg-gray-100 last:hidden" />
                
                {/* Icon Circle */}
                <div className="absolute left-0 top-0 w-12 h-12 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center text-[#2C3E95] z-10">
                  <section.icon className="w-6 h-6" />
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                    {section.title}
                  </h2>
                  <ul className="space-y-4">
                    {section.content.map((item, iIdx) => (
                      <li key={iIdx} className="text-lg text-gray-600 leading-relaxed list-none flex gap-4">
                        <div className="mt-2 w-2 h-2 rounded-full bg-orange-500 flex-shrink-0" />
                        <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-gray-900">$1</strong>') }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 p-8 bg-gray-50 rounded-3xl border border-gray-100 text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Have questions about our terms?</h3>
            <p className="text-gray-600 mb-6">Our support team is here to help you understand your rights and responsibilities.</p>
            <a 
              href="mailto:query@dealerdistributors.com"
              className="inline-block bg-[#2C3E95] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#1f2d6b] transition-colors shadow-lg shadow-blue-500/10"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
