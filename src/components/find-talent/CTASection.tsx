import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
export const CTASection = () => {
  return <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
      <div className="page-container">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} viewport={{
        once: true
      }} className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Match?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Post your project today and get matched with top talent in under 48 hours
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50" onClick={() => window.location.href = "/post-project"}>
              Post a Project
            </Button>
            <Button variant="outline" size="lg" className="border-white hover:bg-white/10 text-orange-300">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>;
};