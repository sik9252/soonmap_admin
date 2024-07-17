import { Tr, Td } from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { ICategoryData } from '../../../../@types/InfoCategory';

type TodoItemViewerProps = {
  category: ICategoryData;
  onChangeEditMode: () => void;
  handleAlertDialog: () => void;
};

function ViewMode({ category, onChangeEditMode, handleAlertDialog }: TodoItemViewerProps) {
  return (
    <Tr>
      <Td width="30%">{category.typeName}</Td>
      <Td width="50%">{category.description}</Td>
      <Td width="20%">
        {category.id === 1 ? (
          ''
        ) : (
          <>
            <EditIcon mr="10px" cursor={'pointer'} onClick={onChangeEditMode} />
            <DeleteIcon cursor={'pointer'} onClick={handleAlertDialog} />
          </>
        )}
      </Td>
    </Tr>
  );
}

export default ViewMode;
