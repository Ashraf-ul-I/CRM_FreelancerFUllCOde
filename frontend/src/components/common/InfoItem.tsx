import { FC, ReactNode } from 'react';

interface InfoItemProps {
  label: string;
  value: ReactNode;
}

const InfoItem: FC<InfoItemProps> = ({ label, value }) => {
  return (
    <div>
      <p className="text-gray-500 dark:text-gray-400 text-lg">{label}</p>
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-3">{value}</p>
    </div>
  );
};

export default InfoItem;
