import AnimatedContent from '@/components/ui/animations/animated-content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FeatureCardProps = {
  icon: React.ElementType;
  title: string;
  description: string;
};

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <AnimatedContent
    distance={100}
    direction='horizontal'
    reverse={false}
    duration={1}
    ease='power3.out'
    initialOpacity={0}
    scale={1}
    threshold={0.1}
  >
    <Card className='transition-all hover:shadow-lg'>
      <CardHeader className='pb-2'>
        <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50'>
          <Icon className='text-green-600' size={32} />
        </div>
        <CardTitle className='text-xl font-semibold'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className=''>{description}</p>
      </CardContent>
    </Card>
  </AnimatedContent>
);

export default FeatureCard;
