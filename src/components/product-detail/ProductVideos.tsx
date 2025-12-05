import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Play } from 'lucide-react';

interface VideoItem {
  title: string;
  url: string;
  thumbnail: string;
}

interface ProductVideosProps {
  productType: 'storm' | 'nest' | undefined;
}

// Extract YouTube video ID from URL
const getYouTubeId = (url: string): string => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^?&]+)/);
  return match ? match[1] : '';
};

// Get thumbnail URL from YouTube video ID
const getYouTubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
};

const stormVideos: VideoItem[] = [
  {
    title: 'Storm Unboxing, Installation and Start Up',
    url: 'https://youtu.be/DDicutmwCdA?si=IDRviySrGF8GE8S_',
    thumbnail: getYouTubeThumbnail('DDicutmwCdA')
  },
  {
    title: 'Storm App Setup',
    url: 'https://youtu.be/l0DanGVIJWE?si=FSuWLDGK1S4neL6Q',
    thumbnail: getYouTubeThumbnail('l0DanGVIJWE')
  }
];

const nestVideos: VideoItem[] = [
  {
    title: 'Nest Launch Video',
    url: 'https://youtu.be/YP_OOsB2hMc?si=R_uqOg2ZwS71UUmZ',
    thumbnail: getYouTubeThumbnail('YP_OOsB2hMc')
  },
  {
    title: 'Nest Unboxing Video',
    url: 'https://youtu.be/fqvpmBTDLZg?si=y3HLtPbxXVGsONxv',
    thumbnail: getYouTubeThumbnail('fqvpmBTDLZg')
  }
];

export function ProductVideos({ productType }: ProductVideosProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get videos based on product type
  const videos = productType === 'storm' ? stormVideos : productType === 'nest' ? nestVideos : [];

  // Don't render if no videos for this product
  if (videos.length === 0) return null;

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="container mx-auto px-6"
      >
        <motion.div variants={fadeInUp} className="mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#36454F] font-montserrat">
            Product Videos
          </h2>
          <p className="text-gray-600 mt-3 font-montserrat">
            Watch helpful guides and tutorials for your {productType === 'storm' ? 'Storm' : 'Nest'} air purifier
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-8"
        >
          {videos.map((video, index) => (
            <motion.a
              key={index}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback to medium quality thumbnail if maxres doesn't exist
                    const target = e.target as HTMLImageElement;
                    const videoId = getYouTubeId(video.url);
                    target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-white/90 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-8 h-8 md:w-10 md:h-10 text-[#3A6B4E] ml-1" fill="#3A6B4E" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="p-5 bg-white">
                <h3 className="text-lg font-semibold text-[#36454F] font-montserrat group-hover:text-[#3A6B4E] transition-colors duration-300">
                  {video.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1 font-montserrat">
                  Watch on YouTube
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
