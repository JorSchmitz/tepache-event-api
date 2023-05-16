export const getStage = () : string => {
  const stage = `${process.env.STAGE || 'local'}`;
  let name;
  switch (stage) {
    case 'development':
      name = `development${process.env.CHART_NAME ? `-${process.env.CHART_NAME}` : ''}`;
      break;
    case 'staging':
      name = 'staging';
      break;
    case 'production':
      name = 'production';
      break;
    default:
      name = process.env.USER || 'local';
      break;
  }
  return name;
};

export const getBoundingContextName = (): string => 'notifications';

export const getBusinessComponentName = (): string => process.env.npm_package_name || 'notifications';

export const getVersion = (): string => process.env.npm_package_version || '0.0.0';
