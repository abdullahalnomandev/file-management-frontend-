import { Lock, Shield, Zap } from "lucide-react";
const features = [
  {
    icon: Shield,
    title: "Secure & Encrypted",
    description:
      "Your files are protected with enterprise-grade encryption and secure storage.",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Zap,
    title: "Fast & Reliable",
    description:
      "Quick uploads and downloads with 99.9% uptime guarantee for uninterrupted access.",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-500",
  },
  {
    icon: Lock,
    title: "Flexible Control",
    description:
      "Organize files with folders, set permissions, and manage storage with ease.",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];
const PowerFullFeture = () => {
  return (
    <section id="features" className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-16 text-center">
          Powerful Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="space-y-4 shadow-lg p-6 rounded-lg">
              <div
                className={`inline-flex items-center justify-center w-12 h-12 ${feature.bgColor} rounded-lg`}
              >
                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerFullFeture;
