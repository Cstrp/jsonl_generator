import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const DescriptionContainer = styled(motion.div)`
  margin: 2rem 0;
  padding: 2rem;
  background: var(--card-bg);
  border-radius: 16px;
  border: 1px solid var(--border);
  box-shadow: 0 4px 6px var(--shadow);
`;

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  background: linear-gradient(to right, var(--accent), var(--accent-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
`;

const Description = styled.p`
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1.5rem;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const FeatureItem = styled.li`
  padding: 1rem;
  background: var(--primary);
  border-radius: 12px;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
`;

const Icon = styled.span`
  font-size: 1.25rem;
`;

const FeatureText = styled.span`
  color: var(--foreground);
  font-size: 0.875rem;
`;

export const AppDescription = () => {
  return (
    <DescriptionContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>About JSONL Generator</Title>
      <Description>
        A specialized tool designed for creating JSONL files to train OpenAI
        models. This application streamlines the process of preparing your
        training data in the correct format.
      </Description>
      <FeatureList>
        <FeatureItem>
          <Icon>📝</Icon>
          <FeatureText>
            Generate properly formatted JSONL files for OpenAI fine-tuning
          </FeatureText>
        </FeatureItem>
        <FeatureItem>
          <Icon>🔍</Icon>
          <FeatureText>
            Preview and validate your training data before export
          </FeatureText>
        </FeatureItem>
        <FeatureItem>
          <Icon>💾</Icon>
          <FeatureText>
            Easy file management with instant preview capabilities
          </FeatureText>
        </FeatureItem>
        <FeatureItem>
          <Icon>🚀</Icon>
          <FeatureText>
            Streamlined workflow for OpenAI model training preparation
          </FeatureText>
        </FeatureItem>
      </FeatureList>
    </DescriptionContainer>
  );
};
