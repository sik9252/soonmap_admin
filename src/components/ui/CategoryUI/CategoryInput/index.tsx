import { useState } from 'react';
import ViewMode from '../ViewMode';
import EditMode from '../EditMode';

export interface CategoryItem {
  id: number;
  typeName: string;
  description: string;
}

export interface CategoryItemProps {
  category: CategoryItem;
  handleAlertDialog: () => void;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

function CategoryInput({ category, handleAlertDialog, currentPage, setCurrentPage }: CategoryItemProps) {
  const [viewMode, setViewMode] = useState(true);

  return (
    <>
      {viewMode ? (
        <ViewMode
          category={category}
          onChangeEditMode={() => setViewMode(false)}
          handleAlertDialog={handleAlertDialog}
        />
      ) : (
        <EditMode
          category={category}
          onChangeViewMode={() => setViewMode(true)}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </>
  );
}

export default CategoryInput;
