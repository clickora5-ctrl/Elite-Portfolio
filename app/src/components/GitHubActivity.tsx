import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, GitCommit, GitBranch, Star, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Generate mock contribution data
const generateContributionData = () => {
  const weeks = 52;
  const days = 7;
  const data = [];
  
  for (let w = 0; w < weeks; w++) {
    const week = [];
    for (let d = 0; d < days; d++) {
      // Random contribution level (0-4)
      const level = Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0;
      week.push(level);
    }
    data.push(week);
  }
  
  return data;
};

const contributionData = generateContributionData();

const getContributionColor = (level: number) => {
  const colors = {
    0: 'bg-white/5',
    1: 'bg-[#2467ec]/30',
    2: 'bg-[#2467ec]/50',
    3: 'bg-[#2467ec]/70',
    4: 'bg-[#2467ec]',
  };
  return colors[level as keyof typeof colors];
};

const recentRepos = [
  { name: 'ecommerce-platform', stars: 45, language: 'TypeScript', color: '#3178c6' },
  { name: 'task-manager-app', stars: 32, language: 'React', color: '#61dafb' },
  { name: 'automation-scripts', stars: 28, language: 'Python', color: '#3776ab' },
  { name: 'portfolio-website', stars: 56, language: 'Next.js', color: '#ffffff' },
];

const recentActivity = [
  { type: 'commit', message: 'Added authentication system', repo: 'ecommerce-platform', time: '2 hours ago' },
  { type: 'push', message: 'Pushed 3 commits to main', repo: 'task-manager-app', time: '5 hours ago' },
  { type: 'star', message: 'Starred react-three-fiber', repo: '', time: '1 day ago' },
  { type: 'commit', message: 'Fixed responsive layout issues', repo: 'portfolio-website', time: '2 days ago' },
];

export default function GitHubActivity() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate contribution squares
      const squares = contentRef.current?.querySelectorAll('.contribution-square');
      if (squares) {
        gsap.fromTo(
          squares,
          { opacity: 0, scale: 0 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.3,
            stagger: 0.005,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#2467ec]/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef}>
          {/* Section Heading */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Github className="w-8 h-8 text-white/70" />
              <h2 className="text-3xl md:text-4xl font-bold">GitHub Activity</h2>
            </div>
            <p className="text-white/60">
              A glimpse into my coding journey and open source contributions
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contribution Graph */}
            <div className="lg:col-span-2 glass rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#2467ec]" />
                  Contribution Graph
                </h3>
                <span className="text-sm text-white/50">Last 365 days</span>
              </div>

              {/* Graph */}
              <div className="overflow-x-auto">
                <div className="flex gap-1 min-w-max">
                  {contributionData.map((week, wIndex) => (
                    <div key={wIndex} className="flex flex-col gap-1">
                      {week.map((day, dIndex) => (
                        <div
                          key={`${wIndex}-${dIndex}`}
                          className={`contribution-square w-3 h-3 rounded-sm ${getContributionColor(
                            day
                          )} hover:ring-2 hover:ring-white/30 transition-all cursor-pointer`}
                          title={`${day} contributions`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center gap-2 mt-4 text-xs text-white/50">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map((level) => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                  />
                ))}
                <span>More</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#2467ec]">1,247</div>
                  <div className="text-xs text-white/50">Contributions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#10b981]">365</div>
                  <div className="text-xs text-white/50">Days Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#f59e0b]">40+</div>
                  <div className="text-xs text-white/50">Repositories</div>
                </div>
              </div>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* Top Repositories */}
              <div className="glass rounded-3xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#f59e0b]" />
                  Top Repositories
                </h3>
                <div className="space-y-3">
                  {recentRepos.map((repo, index) => (
                    <a
                      key={index}
                      href={`https://github.com/wajeeh/${repo.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ background: repo.color }}
                        />
                        <span className="text-sm font-medium group-hover:text-[#2467ec] transition-colors">
                          {repo.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-1 text-white/50">
                        <Star className="w-3 h-3" />
                        <span className="text-xs">{repo.stars}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="glass rounded-3xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <GitCommit className="w-5 h-5 text-[#10b981]" />
                  Recent Activity
                </h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0">
                        {activity.type === 'commit' && (
                          <GitCommit className="w-4 h-4 text-[#10b981]" />
                        )}
                        {activity.type === 'push' && (
                          <GitBranch className="w-4 h-4 text-[#2467ec]" />
                        )}
                        {activity.type === 'star' && (
                          <Star className="w-4 h-4 text-[#f59e0b]" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-white/80">{activity.message}</p>
                        {activity.repo && (
                          <p className="text-xs text-[#2467ec]">{activity.repo}</p>
                        )}
                        <p className="text-xs text-white/40">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
