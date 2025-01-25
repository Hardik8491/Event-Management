import { Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"



export default function PricingPlans() {
  const plans = [
    {
      name: "Core Nexus",
      description: "A basic plan for foundational learning",
      price: "$9.99",
      features: [
        "Access to essential courses",
        "Basic learning tools",
        "Standard support",
        "Monthly progress reports",
        "Access to community forums"
      ],
      cta: "Start Learning"
    },
    {
      name: "Prime Academia",
      description: "Premium access for in-depth learning",
      price: "$19.99",
      features: [
        "All Core Nexus features",
        "Unlimited access to premium courses",
        "Advanced learning tools",
        "Priority support",
        "Personalized learning paths",
        "Exclusive webinars and workshops"
      ],
      cta: "Upgrade to Prime"
    },
    {
      name: "Elite Scholars",
      description: "Specialized content for advanced learners",
      price: "$39.99",
      features: [
        "All Prime Academia features",
        "Access to specialized and advanced courses",
        "Industry-recognized certifications",
        "One-on-one mentoring sessions",
        "Early access to new courses",
        "Networking opportunities with industry experts"
      ],
      cta: "Join Elite Scholars"
    }
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Choose Your Learning Journey</h1>
          <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Select the plan that best fits your educational goals and aspirations.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-12 md:grid-cols-3 md:gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-4xl font-bold mb-4">{plan.price}<span className="text-sm font-normal">/month</span></div>
                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">{plan.cta}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}