"use client";
import { apiFetch } from "@/lib/api/api-fech";
import { IPackage } from "@/types";
import { Button, message } from "antd";
import { CheckCircle, Crown, Star, Diamond, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Pricing = ({ pricing }: { pricing: IPackage[] }) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);
  const getFileTypesDisplay = (types: string[]) => {
    if (Array.isArray(types)) {
      if (types.length > 3) {
        return `${types.slice(0, 3).join(", ")} +${types.length - 3}`;
      }
      return types.join(", ");
    }
    return types;
  };

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case "free":
        return <Zap className="w-5 h-5 text-gray-400" />;
      case "silver":
        return <Star className="w-5 h-5 text-gray-400" />;
      case "gold":
        return <Crown className="w-5 h-5 text-yellow-500" />;
      case "diamond":
        return <Diamond className="w-5 h-5 text-blue-500" />;
      default:
        return <Zap className="w-5 h-5 text-gray-400" />;
    }
  };

  const isHighlighted = (planName: string) => {
    return planName.toLowerCase() === "gold";
  };

  // const getPrice = (planName: string) => {
  //   switch(planName.toLowerCase()) {
  //     case 'free':
  //       return "$0";
  //     case 'silver':
  //       return "$9.99";
  //     case 'gold':
  //       return "$19.99";
  //     case 'diamond':
  //       return "$49.99";
  //     default:
  //       return "$0";
  //   }
  // };

  const router = useRouter();

  const handleUpdateProfile = async (id: number) => {
    setLoadingId(id);
    const data = new FormData();
    data.append("package_id", id.toString());

    const updatePrice = apiFetch(
      "/user/profile",
      {
        method: "PATCH",
        body: data,
      },
      "client"
    );
    try {
      await updatePrice;
      router.push("/user");
      setLoadingId(null);
    } catch (error) {
      setLoadingId(null);
      message.error((error as Error).message);
    }
  };

  return (
    <section
      id="pricing"
      className="py-20 px-4 bg-[linear-gradient(180deg,#F5F5F5_0%,#FFFFFF_100%)]"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 capitalize">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs. All plans include core
            features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pricing.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:translate-y-[-4px] ${
                isHighlighted(plan.name)
                  ? "border-2 border-yellow-400 bg-white shadow-xl shadow-yellow-100/50"
                  : "border border-gray-200 bg-white shadow-lg hover:shadow-xl"
              }`}
            >
              {isHighlighted(plan.name) && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-[linear-gradient(90deg,#FBBF24_0%,#F59E0B_100%)] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between mb-6">
                <div
                  className={`p-3 rounded-xl ${
                    isHighlighted(plan.name) ? "bg-yellow-50" : "bg-gray-50"
                  }`}
                >
                  {getPlanIcon(plan.name)}
                </div>
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-600 capitalize">
                  {plan.name}
                </span>
              </div>

              <div className="mb-6">
                {/* <span className="text-4xl font-bold text-gray-900">{getPrice(plan.name)}</span> */}
                {/* {plan.name.toLowerCase() !== 'free' && (
                  <span className="text-gray-500 ml-2">/month</span>
                )} */}
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-900 font-medium">
                      {plan.total_max_folder}
                    </span>
                    <span className="text-gray-600 ml-1">Total Folders</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-900 font-medium">
                      {plan.max_nesting_folder}
                    </span>
                    <span className="text-gray-600 ml-1">Nesting Level</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-900 font-medium">
                      {plan.max_file_size}MB
                    </span>
                    <span className="text-gray-600 ml-1">Max File Size</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-900 font-medium">
                      {plan.total_file_limit}
                    </span>
                    <span className="text-gray-600 ml-1">Total Files</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-900 font-medium">
                      {plan.file_per_folder_limit}
                    </span>
                    <span className="text-gray-600 ml-1">Files per Folder</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-gray-600">File Types:</span>
                    <span className="text-gray-900 ml-1 block text-sm">
                      {getFileTypesDisplay(plan.allowed_file_type)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                type={isHighlighted(plan.name) ? "primary" : "default"}
                size="large"
                block
                className={`h-12 text-base font-medium rounded-xl ${
                  isHighlighted(plan.name)
                    ? "bg-[linear-gradient(90deg,#FBBF24_0%,#F59E0B_100%)] border-0 shadow-md hover:from-yellow-500 hover:to-yellow-600"
                    : "border-2 hover:border-yellow-400 hover:text-yellow-500"
                }`}
                onClick={() => handleUpdateProfile(plan.id)}
                loading={loadingId === plan.id}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            All plans include 24/7 customer support • No hidden fees • Cancel
            anytime
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
