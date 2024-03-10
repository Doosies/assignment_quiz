import loadingSpinner from '@assets/loading-spinner.svg';

export function LoadingSpinner() {
  return (
    <div className="h-[85%] w-full flex-center">
      <img src={loadingSpinner} />
    </div>
  );
}
