import { useState } from 'react';
import ViewMode from '../ViewMode';
import EditMode from '../EditMode';

export interface CategoryItem {
  id: number;
  categoryName: string;
  categoryDescription: string;
}

export interface CategoryItemProps {
  category: CategoryItem;
  handleAlertDialog: () => void;
}

function CategoryInput({ category, handleAlertDialog }: CategoryItemProps) {
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
        <EditMode category={category} onChangeViewMode={() => setViewMode(true)} />
      )}
    </>
  );
}

export default CategoryInput;
